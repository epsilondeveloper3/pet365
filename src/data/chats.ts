export interface ChatMessage {
  id: number;
  name: string;
  type: string;
  lastMsg: string;
  unread: number;
  img: string;
  pets: string;
  exp: string;
  time: string;
  messages?: {
    id: number;
    text: string;
    time: string;
    sender: 'user' | 'provider';
  }[];
}

export const chats: ChatMessage[] = [
  { 
    id: 1, 
    name: 'Emily Jose', 
    type: 'Cat sitter', 
    lastMsg: 'Hello, your cat is doing great!', 
    unread: 0, 
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', 
    pets: 'Cat', 
    exp: '2 Year', 
    time: '11:00 AM',
    messages: [
      { id: 1, text: 'Hello, I have some questions about the cat sitting.', time: '10:00 AM', sender: 'user' },
      { id: 2, text: 'Hello, your cat is doing great! I just fed her.', time: '11:00 AM', sender: 'provider' }
    ]
  },
  { 
    id: 6, 
    name: 'Philip', 
    type: 'Groomer', 
    lastMsg: 'I have Booked Grooming Services...', 
    unread: 2, 
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', 
    pets: 'Dog', 
    exp: '4 Year', 
    time: '10:30 AM',
    messages: [
      { id: 1, text: 'Hello, Jorje. How can I help you and your pet today?', time: '3:00 AM', sender: 'provider' },
      { id: 2, text: 'I have Booked Grooming Services. Are You available on 25 Oct?', time: '6:30 AM', sender: 'user' }
    ]
  },
  { 
    id: 2, 
    name: 'Gladys', 
    type: 'Vet', 
    lastMsg: 'Are You available on 25 Oct', 
    unread: 3, 
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', 
    pets: 'Cat', 
    exp: '1 Year', 
    time: 'Yesterday' 
  },
  { 
    id: 3, 
    name: 'Dianne', 
    type: 'Groomer', 
    lastMsg: 'Hello, Jorje. How is your pet?', 
    unread: 12, 
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', 
    pets: 'Dog, Cat', 
    exp: '2 Year', 
    time: 'March 5' 
  },
  { 
    id: 4, 
    name: 'Dr. Smith', 
    type: 'Vet', 
    lastMsg: 'The prescription is ready.', 
    unread: 0, 
    img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop', 
    pets: 'Dog', 
    exp: '10 Year', 
    time: 'March 4' 
  },
  { 
    id: 5, 
    name: 'Pet Spa', 
    type: 'Groomer', 
    lastMsg: 'Your appointment is confirmed.', 
    unread: 0, 
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', 
    pets: 'Cat', 
    exp: '5 Year', 
    time: 'March 3' 
  }
];
