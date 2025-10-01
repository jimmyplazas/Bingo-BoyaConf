"use client";

import React, { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import {
  doc,
  onSnapshot,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  collection,
} from "firebase/firestore";
import { auth, googleProvider, db } from "@/lib/firebase";
import type { UserData } from "@/lib/types";

type AuthContextType = {
  user: {
    uid: string;
    displayName?: string | null;
    email?: string | null;
    photoURL?: string | null;
  } | null;
  userData: UserData | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProgress: (progress: boolean[]) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"] | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeUserDoc: (() => void) | undefined = undefined;

    const unsubAuth = onAuthStateChanged(auth, async (fbUser) => {
      setLoading(true);
      if (fbUser) {
        const u = {
          uid: fbUser.uid,
          displayName: fbUser.displayName ?? null,
          email: fbUser.email ?? null,
          photoURL: fbUser.photoURL ?? null,
        };
        setUser(u);

        try {
          const userRef = doc(db, "users", u.uid);
          const snap = await getDoc(userRef);

          if (!snap.exists()) {
            // 👉 primera vez: asignamos un board aleatorio
            const boardsSnap = await getDocs(collection(db, "boards"));
            const boardIds = boardsSnap.docs.map((d) => d.id);
            const randomBoardId =
              boardIds[Math.floor(Math.random() * boardIds.length)];

            const shortId = u.uid.slice(-4); // 👈 shortId = últimos 4 caracteres del UID

            await setDoc(userRef, {
              uid: u.uid,
              shortId,
              displayName: u.displayName,
              email: u.email,
              photoURL: u.photoURL,
              isAdmin: false,
              boardId: randomBoardId,
              progress: Array(25).fill(false),
            });
          }

          unsubscribeUserDoc = onSnapshot(
            userRef,
            (docSnap) => {
              if (docSnap.exists()) {
                setUserData(docSnap.data() as UserData);
              } else {
                setUserData(null);
              }
              setLoading(false);
            },
            (err) => {
              console.error("onSnapshot user doc error:", err);
              setLoading(false);
            }
          );
        } catch (err) {
          console.error("Error en asignación de board:", err);
          setLoading(false);
        }
      } else {
        setUser(null);
        setUserData(null);
        if (unsubscribeUserDoc) unsubscribeUserDoc();
        setLoading(false);
      }
    });

    return () => {
      unsubAuth();
      if (unsubscribeUserDoc) unsubscribeUserDoc();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("signInWithGoogle error:", err);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.error("signOut error:", err);
    }
  };

  const updateUserProgress = async (progress: boolean[]) => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    await updateDoc(ref, { progress });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        signInWithGoogle,
        signOut,
        updateUserProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
