import './Dropdown.css';
import { ChevronDown } from 'lucide-preact';

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select option',
  className = ''
}: DropdownProps) {
  return (
    <div className={`form-group ${className}`}>
      {label && <label>{label}</label>}
      <div className="select-container">
        <select 
          className="custom-select" 
          value={value} 
          onChange={(e) => onChange((e.target as HTMLSelectElement).value)}
        >
          <option value="" disabled selected>{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="select-icon">
          <ChevronDown size={20} />
        </div>
      </div>
    </div>
  );
}
