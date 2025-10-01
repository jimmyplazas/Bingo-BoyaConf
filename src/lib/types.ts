export interface User {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
  isAdmin?: boolean;
}

export interface UserData {
  uid: string;
  boardId: string;
  progress: boolean[];
  shortId?: string;
  createdAt?: any;
  isAdmin?: boolean;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}


export interface Board {
  id: string;
  name: string;
  phrases: string[];
}
