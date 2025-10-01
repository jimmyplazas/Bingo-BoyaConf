// src/hooks/use-board.ts
"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Board } from "@/lib/types";

export function useBoard(boardId: string | null) {
  const [board, setBoard] = useState<Board | null>(null);

  useEffect(() => {
    if (!boardId) return;
    const fetch = async () => {
      const ref = doc(db, "boards", boardId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        const phrases = Array.isArray(data.phrases)
          ? data.phrases
          : (data.phrases as string).split(",")
            .map(p => p.trim().replace(/^"|"$/g, ""))
            .filter(Boolean);


        setBoard({ ...data, phrases } as Board);
      } else {
        setBoard(null);
      }
    };
    fetch();
  }, [boardId]);

  return board};
