import { doc, getDoc, setDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import type { User, UserData } from "./types";

/**
 * Elige un boardId aleatorio a partir de la colección 'boards'
 */
async function chooseRandomBoardId(): Promise<string> {
  const boardsSnap = await getDocs(collection(db, "boards"));
  const ids: string[] = [];
  boardsSnap.forEach(d => ids.push(d.id));
  if (ids.length === 0) return "board-1";
  return ids[Math.floor(Math.random() * ids.length)];
}

/**
 * Crea users/{uid} si no existe.
 * Devuelve el documento final (data).
 */
export async function createUserIfNotExists(user: User): Promise<UserData> {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data() as UserData;
  }

  // asigna board aleatorio (usa boards de Firestore)
  const boardId = await chooseRandomBoardId();

  const initialData: UserData = {
    uid: user.uid,
    boardId,
    progress: Array(25).fill(false),
    displayName: user.displayName ?? "",
    email: user.email ?? "",
    photoURL: user.photoURL ?? "",
    isAdmin: false,
    createdAt: serverTimestamp() as any,
  };

  await setDoc(ref, initialData);
  return initialData;
}
