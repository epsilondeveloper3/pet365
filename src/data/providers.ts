export interface Provider {
  id: string;
  name: string;
  type: string;
  location: string;
  rating: number;
  price: number;
  exp: string;
  pets: string;
  img: string;
  bio: string;
  certifications: string[];
  reviews: {
    id: number;
    user: string;
    avatar: string;
    date: string;
    rating: number;
    comment: string;
  }[];
}

export const providers: Provider[] = [
  {
    id: '1',
    name: 'EMILY JOSE',
    type: 'Cat sitter',
    location: 'Ridgewood, NY',
    rating: 4.5,
    price: 129.99,
    exp: '2 Year',
    pets: 'Dog, Cat',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    certifications: ['/image 4.png', '/image 5.png', '/image 6.png'],
    bio: "Emily is a lifelong pet lover. They're available for overnight stays on weekends and can administer topical, eye/ear, and oral meds. Your furry family will be treated with love and care while you're away! 🐱✨",
    reviews: [
      { id: 1, user: 'Dianne Russell', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', date: '1 Feb, 2026', rating: 4.5, comment: 'EMILY took great care of our cat! Excellent communication!' },
      { id: 2, user: 'Floyd Miles', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100', date: '8 Sep, 2026', rating: 4.5, comment: 'EMILY did a great job taking care of my two kitties. Sent a lot of cute pics too!' }
    ]
  },
  {
    id: '2',
    name: 'JOSE WILL',
    type: 'Trainee',
    location: 'Brooklyn, NY',
    rating: 4.8,
    price: 150.00,
    exp: '3 Year',
    pets: 'Dog, Cat',
    img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
    certifications: ['/cert1.png', '/cert2.png'],
    bio: "Jose is an experienced pet trainer specializing in behavioral correction and obedience. He has worked with over 100 dogs of various breeds.",
    reviews: [
      { id: 1, user: 'Annette Black', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', date: '22 Oct, 2026', rating: 5.0, comment: 'Incredible trainer. My dog settled down in just two sessions!' }
    ]
  },
  {
    id: '3',
    name: 'PHILIP MARK',
    type: 'Groomer',
    location: 'Manhattan, NY',
    rating: 5.0,
    price: 85.00,
    exp: '4 Year',
    pets: 'Dog',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    certifications: ['/cert3.png'],
    bio: "Philip provides premium grooming services including hair trimming, nail clipping, and deep cleansing baths.",
    reviews: []
  }
];
