import BingoSquare from './bingo-square';
import { Loader2 } from 'lucide-react';

interface BingoBoardProps {
  phrases: string[];
  progress: boolean[];
  isCheckingForBingo: boolean;
}

export default function BingoBoard({ phrases, progress, isCheckingForBingo }: BingoBoardProps) {
  return (
    <div className="relative mt-8">
      <div className="grid grid-cols-5 gap-2 md:gap-4 aspect-square">
        {phrases.map((phrase, index) => (
          <BingoSquare
            key={index}
            phrase={phrase}
            isMarked={progress[index]}
          />
        ))}
      </div>
      {isCheckingForBingo && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-primary font-medium">Checking for Bingo...</p>
            </div>
        </div>
      )}
    </div>
  );
}
