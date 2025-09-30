export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  isAdmin: boolean;
}

export interface Board {
  id: string;
  name: string;
  phrases: string[];
}

export interface UserData {
  uid: string;
  boardId: string;
  progress: boolean[];
}

export const USERS: Record<string, User> = {
  U1S1: { uid: 'U1S1', displayName: 'Alex Doe', email: 'alex@example.com', photoURL: 'https://picsum.photos/seed/user1/100/100', isAdmin: false },
  U2S2: { uid: 'U2S2', displayName: 'Beth Smith', email: 'beth@example.com', photoURL: 'https://picsum.photos/seed/user2/100/100', isAdmin: false },
  U3S3: { uid: 'U3S3', displayName: 'Charlie Brown', email: 'charlie@example.com', photoURL: 'https://picsum.photos/seed/user3/100/100', isAdmin: false },
  U4S4: { uid: 'U4S4', displayName: 'Diana Prince', email: 'diana@example.com', photoURL: 'https://picsum.photos/seed/user4/100/100', isAdmin: false },
  U5S5: { uid: 'U5S5', displayName: 'Ethan Hunt', email: 'ethan@example.com', photoURL: 'https://picsum.photos/seed/user5/100/100', isAdmin: false },
  ADM1: { uid: 'ADM1', displayName: 'Admin User', email: 'admin@example.com', photoURL: 'https://picsum.photos/seed/admin/100/100', isAdmin: true },
  ADM2: { uid: 'ADM2', displayName: 'Jimmy Ale', email: 'jimmyale3102@gmail.com', photoURL: 'https://picsum.photos/seed/admin2/100/100', isAdmin: true },
};

export const BOARDS: Record<string, Board> = {
  'board-1': {
    id: 'board-1',
    name: 'Networking Novice',
    phrases: [
      "Find someone who works in AI", "Meet a frontend developer", "Talk to a project manager", "Find a UX designer", "Chat with a backend engineer",
      "Find someone from a startup", "Meet a person from a large tech company", "Talk to a student", "Find an event speaker", "Chat with a BoyaConf organizer",
      "Ask about someone's favorite dev tool", "FREE SQUARE", "Discuss a recent tech trend", "Find someone with the same favorite programming language", "Get a career advice",
      "Find someone who has contributed to open source", "Meet a person who traveled more than 5 hours to be here", "Talk to someone about their side project", "Find a person who is hiring", "Chat about a non-tech hobby",
      "Find someone who is attending their first conference", "Meet a person with a cool sticker on their laptop", "Talk to someone from your city", "Find a remote worker", "Take a selfie with a new connection"
    ],
  },
  'board-2': {
    id: 'board-2',
    name: 'Social Butterfly',
    phrases: [
      "Talk to a data scientist", "Find a mobile developer", "Meet a DevOps engineer", "Chat with a technical writer", "Find someone working in security",
      "Ask about someone's first computer", "Get a book recommendation", "Talk about a favorite podcast", "Find a person who plays a musical instrument", "Discuss a favorite movie",
      "Find someone with a cool pet", "FREE SQUARE", "Chat with a person wearing a tech T-shirt", "Find someone who prefers tabs over spaces", "Meet a person who has published a blog post",
      "Talk to someone who works on a product you use", "Find a person with the same birth month", "Chat about your dream travel destination", "Find a coffee enthusiast", "Meet someone who has run a marathon",
      "Talk to a person from another country", "Find a night owl", "Get a restaurant recommendation", "Chat with an early bird", "Find a BoyaConf volunteer"
    ],
  },
};

export const USER_DATA: Record<string, UserData> = {
  U1S1: { uid: 'U1S1', boardId: 'board-1', progress: Array(25).fill(false).map((_, i) => i === 12) },
  ADM1: { uid: 'ADM1', boardId: 'board-2', progress: Array(25).fill(false).map((_, i) => i === 12) },
};
