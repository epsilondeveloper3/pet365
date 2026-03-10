import './MyPets.css';
import { Menu, Bell, User, Plus } from 'lucide-preact';
import { BottomNav } from '../../components/BottomNav';
import { route } from 'preact-router';
import { useState, useEffect } from 'preact/hooks';
import { useSidebar } from '../../context/SidebarContext';



interface Props {
  path?: string;
}

import { initialPets } from '../../data/pets';

export function MyPets({ path: _path }: Props) {
  const { openSidebar } = useSidebar();
  const [pets, setPets] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('pet365_user_pets');
    if (saved) {
      setPets(JSON.parse(saved));
    } else {
      setPets(initialPets);
      localStorage.setItem('pet365_user_pets', JSON.stringify(initialPets));
    }
  }, []);

  const handleRemove = (id: string, e: any) => {
    e.stopPropagation();
    const updatedPets = pets.filter(p => p.id !== id);
    setPets(updatedPets);
    localStorage.setItem('pet365_user_pets', JSON.stringify(updatedPets));
  };

  const handleEdit = (id: string, e: any) => {
    e.stopPropagation();
    route(`/edit-pet/${id}`);
  };

  return (
    <div className="container dashboard-container -my-pets-page">
      <div className="top-bar">
        <div className="icon-btn" onClick={openSidebar}>
          <Menu size={20} />
        </div>
        <img src="/logo.png" alt="Logo" className="-dashboard-style-2" style={{ width: '100px' }} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="icon-btn" onClick={() => route('/notifications')}>
            <Bell size={20} />
          </div>
          <div className="icon-btn" onClick={() => route('/profile')}>
            <User size={20} />
          </div>
        </div>
      </div>

      <div className="my-pets-header-row">
        <h3>My Pets</h3>
        <button className="add-pet-btn-pill" onClick={() => route('/add-pet')}>
          <Plus size={16} /> <span>Add Pet</span>
        </button>
      </div>

      <div className="pets-grid-container">
        {pets.map(pet => (
          <div key={pet.id} className="pet-card-v2">
            <div className="pet-img-box">
              <img src={pet.image || '/logo.png'} alt={pet.name} />
            </div>
            <div className="pet-card-content">
              <h4>{pet.name}</h4>
              <p className="pet-breed-txt">{pet.breed}</p>
              <div className="pet-badges">
                <span className="pet-badge-item">{pet.type}</span>
                <span className="pet-badge-item">Age: {pet.age} Year</span>
              </div>
              <div className="pet-card-btns">
                <button className="remove-p-btn" onClick={(e) => handleRemove(pet.id, e)}>Remove</button>
                <button className="edit-p-btn" onClick={(e) => handleEdit(pet.id, e)}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav activeTab="profile" />
    </div>
  );
}
