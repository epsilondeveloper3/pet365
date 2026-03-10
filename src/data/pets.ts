export interface Pet {
  id: string;
  name: string;
  breed: string;
  type: string;
  gender: string;
  age: number;
  weight: string;
  image: string;
}

export const initialPets: Pet[] = [
  {
    id: '1',
    name: 'Monty',
    breed: 'Husky',
    type: 'Dog',
    gender: 'Male',
    age: 2,
    weight: '12kg',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop'
  },
  {
    id: '2',
    name: 'Bella',
    breed: 'Golden Retriever',
    type: 'Dog',
    gender: 'Female',
    age: 3,
    weight: '10kg',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop'
  }
];
