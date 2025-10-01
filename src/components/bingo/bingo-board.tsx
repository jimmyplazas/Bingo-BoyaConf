// src/components/bingo/bingo-board.tsx
"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BingoBoardProps {
  phrases: string[];
  progress: boolean[];
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
  isCheckingForBingo: boolean;
}

export default function BingoBoard({
  phrases,
  progress,
  selectedIndex,
  setSelectedIndex,
  isCheckingForBingo,
}: BingoBoardProps) {
  // defensiva: asegurar que phrases sea array
  const safePhrases = Array.isArray(phrases) ? phrases : String(phrases).split(",").map(p => p.trim()).filter(Boolean);
  const safeProgress = Array.isArray(progress) ? progress : Array(safePhrases.length).fill(false);

  return (
    <div className="relative">
      {/* Overlay spinner mientras se comprueba Bingo */}
      {isCheckingForBingo && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-10 w-10 animate-spin text-white" />
            <span className="text-white">Checking for Bingo...</span>
          </div>
        </div>
      )}

      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-5 gap-2 md:gap-4 min-w-[500px]">
          {safePhrases.map((phrase, index) => {
            const isMarked = !!safeProgress[index];
            const isSelected = index === selectedIndex;

            return (
              <button
                key={index}
                onClick={() => !isMarked && setSelectedIndex(index)}
                className={cn(
                  "p-2 text-[10px] md:text-sm border rounded text-center leading-tight break-words",
                  isMarked ? "bg-green-500 text-white cursor-not-allowed" : "bg-white hover:bg-gray-100",
                  isSelected && "ring-2 ring-primary"
                )}
                disabled={isMarked}
              >
                {phrase}
              </button>



            );
          })}
        </div>
      </div>

    </div>
  );
}
