import './AddPet.css';
import { useState, useRef, useEffect } from 'preact/hooks';
import { ChevronLeft, X, UploadCloud, ChevronUp, ChevronDown } from 'lucide-preact';
import { route } from 'preact-router';
import { Dropdown } from '../../components/Dropdown/Dropdown';

interface Props {
  path?: string;
  id?: string; // For edit mode
}

export function AddPet({ id }: Props) {
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petType, setPetType] = useState('Dog');
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState(3);
  const [petImage, setPetImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const typeOptions = [
    { label: 'Dog', value: 'Dog' },
    { label: 'Cat', value: 'Cat' },
    { label: 'Horse', value: 'Horse' },
    { label: 'Cow', value: 'Cow' },
    { label: 'Reptile', value: 'Reptile' },
    { label: 'Snake', value: 'Snake' },
    { label: 'Tiger', value: 'Tiger' },
    { label: 'Monkey', value: 'Monkey' },
    { label: 'Bird', value: 'Bird' }
  ];

  const breedOptions = [
    { label: 'Husky', value: 'Husky' },
    { label: 'Persian Cat', value: 'Persian' },
    { label: 'Golden Retriever', value: 'Golden Retriever' },
    { label: 'Bulldog', value: 'Bulldog' },
    { label: 'German Shepherd', value: 'German Shepherd' },
    { label: 'Other', value: 'Other' }
  ];

  useEffect(() => {
    if (id) {
      const savedPets = localStorage.getItem('pet365_user_pets');
      if (savedPets) {
        const pets = JSON.parse(savedPets);
        const petToEdit = pets.find((p: any) => p.id === id);
        if (petToEdit) {
          setPetName(petToEdit.name);
          setPetBreed(petToEdit.breed);
          setPetType(petToEdit.type || 'Dog');
          setGender(petToEdit.gender);
          setAge(petToEdit.age);
          setPetImage(petToEdit.image);
        }
      }
    }
  }, [id]);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      // Basic size check to avoid QuotaExceededError
      if (file.size > 1024 * 1024) { // 1MB limit for demo
        alert('Image is too large. Please select an image under 1MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => setPetImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!petName) {
      alert('Please enter a pet name.');
      return;
    }

    const savedPets = localStorage.getItem('pet365_user_pets');
    let pets = savedPets ? JSON.parse(savedPets) : [];

    const petData = {
      id: id || Math.random().toString(36).substr(2, 9),
      name: petName,
      breed: petBreed || 'General',
      type: petType,
      age: age,
      gender: gender,
      image: petImage || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300'
    };

    if (id) {
      pets = pets.map((p: any) => (p.id === id ? petData : p));
    } else {
      pets.push(petData);
    }

    try {
      localStorage.setItem('pet365_user_pets', JSON.stringify(pets));
      route('/my-pets');
    } catch (e) {
      console.error('Storage error:', e);
      alert('Failed to save pet. The image might be too large for storage. Please try a smaller image.');
    }
  };

  return (
    <div className="container dashboard-container add-pet-page-v2">
      <div className="add-pet-nav-header">
        <div className="circ-btn" onClick={() => route('/my-pets')}>
          <ChevronLeft size={22} />
        </div>
        <h3>{id ? 'Edit Pet' : 'Add Pets'}</h3>
        <div className="circ-btn" onClick={() => route('/my-pets')}>
          <X size={22} />
        </div>
      </div>

      <div className="a-pet-form">
        <div className="form-group">
          <label>Pet Image</label>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
          <div className="upload-box-v2" onClick={handleUploadClick}>
            {petImage ? (
               <img src={petImage} className="pet-prev-sq" alt="Preview" />
            ) : (
              <div className="upload-empty-v2">
                <div className="up-ic-v2"><UploadCloud size={32} /></div>
                <h3>Upload Profile Picture</h3>
                <p>Profile must be png or jpeg, jpg</p>
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Pet Name</label>
          <input 
            type="text" 
            placeholder="Enter name" 
            value={petName}
            onInput={(e: any) => setPetName(e.target.value)}
          />
        </div>

        <Dropdown 
          label="Pet Type"
          options={typeOptions}
          value={petType}
          onChange={setPetType}
          placeholder="Select pet type"
        />

        <Dropdown 
          label="Pet Breed"
          options={breedOptions}
          value={petBreed}
          onChange={setPetBreed}
          placeholder="Select breed"
        />

        <div className="form-group">
          <label>Gender</label>
          <div className="gender-sel-row">
            <button 
              className={`gender-sel-btn ${gender === 'Male' ? 'active' : ''}`}
              onClick={() => setGender('Male')}
            >
              <div className="rad-circ"><div className="rad-inner"></div></div> Male
            </button>
            <button 
              className={`gender-sel-btn ${gender === 'Female' ? 'active' : ''}`}
              onClick={() => setGender('Female')}
            >
              <div className="rad-circ"><div className="rad-inner"></div></div> Female
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Age Of your pet</label>
          <div className="age-step-v2">
            <input type="text" value={`${age} Years`} readOnly />
            <div className="step-ctrls-v2">
              <button onClick={() => setAge(prev => prev + 1)}><ChevronUp size={16} /></button>
              <button onClick={() => setAge(prev => Math.max(0, prev - 1))}><ChevronDown size={16} /></button>
            </div>
          </div>
        </div>

        <div className="a-pet-submit-box">
          <button className="btn btn-primary btn-add-full" onClick={handleSubmit}>
             {id ? 'Update Pet' : 'Add Pet'}
          </button>
        </div>
      </div>
    </div>
  );
}
