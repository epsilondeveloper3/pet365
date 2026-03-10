const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const pagesDir = path.join(__dirname, 'src/pages');

// Simple helper to convert camelCase to kebab-case
const toKebab = str => str.replace(/([A-Z])/g, '-$1').toLowerCase();

// properties that don't need 'px' at the end of numbers
const unitlessNumberProperties = ['flex', 'opacity', 'fontWeight', 'zIndex', 'lineHeight', 'flexGrow', 'flexShrink', 'columns', 'columnCount'];

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const dirName = path.dirname(filePath);
  const baseName = path.basename(filePath, '.tsx');
  const cssPath = path.join(dirName, baseName + '.css');

  const ast = parser.parse(content, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
  });

  let styleCounter = 1;
  const stylesObj = {};

  traverse(ast, {
    JSXOpeningElement(pathNode) {
      const attributes = pathNode.node.attributes;

      const styleAttrIdx = attributes.findIndex(attr => attr.type === 'JSXAttribute' && attr.name && attr.name.name === 'style');
      if (styleAttrIdx === -1) return;

      const styleAttr = attributes[styleAttrIdx];
      const styleVal = styleAttr.value;

      if (styleVal.type !== 'JSXExpressionContainer' || styleVal.expression.type !== 'ObjectExpression') {
        // dynamic style or variable, skip
        return;
      }

      const objProps = styleVal.expression.properties;
      const staticProps = [];
      const dynamicProps = [];

      for (let prop of objProps) {
        if (prop.type === 'ObjectProperty') {
          // ensure the key is literal or identifier and value is literal
          let key = prop.key.name || prop.key.value;
          if ((prop.value.type === 'StringLiteral' || prop.value.type === 'NumericLiteral') && key) {
            staticProps.push({
              key: toKebab(key),
              value: prop.value.type === 'NumericLiteral' && prop.value.value !== 0 && !unitlessNumberProperties.includes(key)
                ? `${prop.value.value}px`
                : prop.value.value
            });
          } else {
            dynamicProps.push(prop);
          }
        } else {
          dynamicProps.push(prop); // SpreadElement or others
        }
      }

      if (staticProps.length === 0) return;

      const className = `${toKebab(baseName)}-style-${styleCounter++}`;
      stylesObj[className] = staticProps;

      // Update className attribute
      let classAttrIdx = attributes.findIndex(attr => attr.type === 'JSXAttribute' && attr.name && attr.name.name === 'className');
      if (classAttrIdx > -1) {
        let classAttr = attributes[classAttrIdx];
        if (classAttr.value.type === 'StringLiteral') {
          classAttr.value.value = `${classAttr.value.value} ${className}`;
        } else if (classAttr.value.type === 'JSXExpressionContainer') {
          // merge className={`existing ${variables}`}
          if (classAttr.value.expression.type === 'TemplateLiteral') {
            classAttr.value.expression.quasis[classAttr.value.expression.quasis.length - 1].value.raw += ` ${className}`;
          } else {
            // If the user has a variable, eg className={var}, we can wrap in template literal
            // For simplicity, skip modifying complex dynamic classes unless wrapped
            classAttr.value.expression = t.templateLiteral(
              [t.templateElement({ raw: '', cooked: '' }), t.templateElement({ raw: ` ${className}`, cooked: ` ${className}` })],
              [classAttr.value.expression]
            );
          }
        }
      } else {
        // Add new className
        attributes.push(t.jsxAttribute(t.jsxIdentifier('className'), t.stringLiteral(className)));
      }

      // Update or remove style attribute
      if (dynamicProps.length > 0) {
        styleAttr.value.expression.properties = dynamicProps;
      } else {
        attributes.splice(styleAttrIdx, 1);
      }
    }
  });

  if (Object.keys(stylesObj).length > 0) {
    const generated = generate(ast, {}, content);
    fs.writeFileSync(filePath, generated.code);

    let cssStr = fs.readFileSync(cssPath, 'utf-8');
    for (const className in stylesObj) {
      cssStr += `\n.${className} {\n`;
      stylesObj[className].forEach(prop => {
        cssStr += `  ${prop.key}: ${prop.value};\n`;
      });
      cssStr += `}\n`;
    }
    fs.writeFileSync(cssPath, cssStr.trimStart());
  }
}

function traverseDir(dir) {
  const files = fs.readdirSync(dir);
  for (let file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

traverseDir(pagesDir);
console.log('Conversion completed.');
