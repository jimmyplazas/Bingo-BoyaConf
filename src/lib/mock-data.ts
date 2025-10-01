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
      "Programa en Kotlin", "Prefiere backend que frontend", "Tiene stickers tech en su laptop", "Usa una camiseta de tecnología", "Usa Copilot en su trabajo",
      "Ha contribuido a Open Source", "Hizo un nuevo amigo en BoyaConf", "Se unió a Discord de Boyacá Dev hoy", "PUNTO GANADO POR ASISTIR", "Conoció a alguien de otra ciudad",
      "Viene de Chile", "Usa Linux", "Publicó una selfie con el hashtag #BoyaConf2025", "Tiene un curso online pendiente", "Viene de Sogamoso",
      "Se llama igual que tú", "Tiene nivel de inglés C1", "Tiene sitio web personal", "Tiene una mascota", "Es desarrollador frontend",
      "Ha tumbado producción", "Asistió a BoyaConf 2024", "Tiene más de 10 proyectos en GitHub", "Tiene más de 4 años de experiencia laboral", "Ha usado Docker"
    ],
  },
  'board-2': {
    id: 'board-2',
    name: 'Social Butterfly',
    phrases: [
      "Conoce qué es Continuous Delivery", "Tiene una foto con algún organizador", "Usa el IDE en Dark mode", "Tiene un Smartwatch", "Trabaja en una Startup",
      "Usa un IDE de JetBrains", "Ha participado en alguna hackathon", "Le gusta leer", "Escucha música mientras programa", "Fan de anime o manga",
      "Viene de Medellín", "Tiene 2 monitores en su setup", "Aprendió a programar en Java", "Se llama igual que tú", "Ha usado Gemini o Claude",
      "Le gusta el Café", "Ha viajado a más de 2 países", "Hizo un nuevo amigo en BoyaConf", "Ha sido mentor", "Conoce qué es GraphQL",
      "Mencionó a #BoyaConf2025 en una publicación hoy", "PUNTO GANADO POR ASISTIR", "Ha probado un framework nuevo este año", "Tiene una Mac", "Publicó una selfie con el hashtag #BoyaConf2025"
    ],
  },
  'board-3': {
    id: 'board-3',
    name: 'Tech Explorer',
    phrases: [
      "Viene de Barranquilla", "Primera vez en BoyaConf", "Sabe el nombre de al menos un organizador", "Sigue a Boyacá Dev en alguna red social", "Asistió gracias a una beca",
      "Publicó una selfie con el hashtag #BoyaConf2025", "Ha dado una charla", "Conoce qué es TDD", "Se llama igual que tú", "Tiene nivel de inglés B2",
      "Estudia o es egresado de la UPTC", "Alguien que odia los lunes", "Publicó una historia en Instagram sobre el evento", "Ha usado IA para generar imágenes", "Conoció a un organizador hoy",
      "Tiene un side project publicado", "Tiene una foto con algún ponente", "Ha jugado Mario Kart 64", "Tiene al menos una certificación en AWS, Azure o GCP", "PUNTO POR ASISTIR",
      "Ha creado un GitHub Action", "Conoce qué es Clean Architecture", "No le gusta JS", "Hizo un nuevo amigo en BoyaConf", "Ha usado IA generativa en Producción"
    ],
  },
  'board-4': {
    id: 'board-4',
    name: 'Geek Connector',
    phrases: [
      "Sabe qué es API REST", "Ha hecho freelancing", "Ha publicado una librería", "Ha usado Supabase", "Tiene un canal de YouTube tech",
      "Prefiere programar en la madrugada", "Tiene más de 5 seguidores en GitHub", "Prefiere Light theme", "PUNTO GANADO POR ASISTIR", "Viene de Bogotá",
      "Le apasiona enseñar", "Mencionó a #BoyaConf2025 en una publicación hoy", "Ha trabajado para una empresa internacional", "Ha hecho scraping web con Python", "Hizo un nuevo amigo en BoyaConf",
      "Usa Windows", "Publicó una selfie con el hashtag #BoyaConf2025", "Ha usado n8n", "Ha hecho test de usabilidad", "Aprendió algo nuevo hoy",
      "Ha probado Arduino", "Ha usado Firebase", "Usa Git todos los días", "Viene de Duitama", "Se llama igual que tú"
    ],
  },
};

export const USER_DATA: Record<string, UserData> = {
  U1S1: { uid: 'U1S1', boardId: 'board-1', progress: Array(25).fill(false).map((_, i) => i === 12) },
  ADM1: { uid: 'ADM1', boardId: 'board-2', progress: Array(25).fill(false).map((_, i) => i === 12) },
};
