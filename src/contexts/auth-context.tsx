'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { USERS, USER_DATA, User, UserData, BOARDS } from '@/lib/mock-data';

// This is a simplified mock of Firebase Auth.
// In a real app, you would use the Firebase SDK.

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signInWithGoogle: () => void;
  signOut: () => void;
  updateUserProgress: (newProgress: boolean[]) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// A mock user to simulate Google Sign-In
const mockLoggedInUser = USERS['U1S1'];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking auth state on load
    const sessionUser = sessionStorage.getItem('bingo-user');
    if (sessionUser) {
      const parsedUser = JSON.parse(sessionUser);
      setUser(parsedUser);
      loadUserData(parsedUser.uid);
    }
    setLoading(false);
  }, []);

  const loadUserData = (uid: string) => {
    // Simulate fetching user data from a database
    let gameData = USER_DATA[uid];
    if (!gameData) {
      // New user, assign a random board
      const boardIds = Object.keys(BOARDS);
      const randomBoardId = boardIds[Math.floor(Math.random() * boardIds.length)];
      const initialProgress = Array(25).fill(false);
      // Center square is free
      initialProgress[12] = true;
      gameData = { uid, boardId: randomBoardId, progress: initialProgress };
      USER_DATA[uid] = gameData; // "Save" to our mock DB
    }
    setUserData(gameData);
    sessionStorage.setItem('bingo-user-data', JSON.stringify(gameData));
  };
  
  const signInWithGoogle = () => {
    setLoading(true);
    // In a real app, this would be:
    // signInWithPopup(auth, googleProvider).then(result => ...);
    
    // For now, we'll just set a mock user.
    // Let's allow switching between a normal user and an admin user for testing.
    const currentUser = sessionStorage.getItem('bingo-user');
    const targetUser = currentUser && JSON.parse(currentUser).uid === 'U1S1' ? USERS['ADM1'] : USERS['U1S1'];

    setUser(targetUser);
    sessionStorage.setItem('bingo-user', JSON.stringify(targetUser));
    loadUserData(targetUser.uid);
    setLoading(false);
  };

  const signOut = () => {
    setLoading(true);
    setUser(null);
    setUserData(null);
    sessionStorage.removeItem('bingo-user');
    sessionStorage.removeItem('bingo-user-data');
    setLoading(false);
  };

  const updateUserProgress = (newProgress: boolean[]) => {
    if (userData) {
      const newUserData = { ...userData, progress: newProgress };
      setUserData(newUserData);
      sessionStorage.setItem('bingo-user-data', JSON.stringify(newUserData));
      // Also update our mock "DB"
      USER_DATA[userData.uid] = newUserData;
    }
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, signInWithGoogle, signOut, updateUserProgress }}>
      {children}
    </AuthContext.Provider>
  );
};
