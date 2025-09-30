import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

interface BingoSquareProps {
  phrase: string;
  isMarked: boolean;
}

export default function BingoSquare({ phrase, isMarked }: BingoSquareProps) {
  return (
    <div
      className={cn(
        'flex aspect-square flex-col items-center justify-center rounded-lg border p-2 text-center transition-all duration-300',
        isMarked
          ? 'bg-accent text-accent-foreground shadow-lg scale-105 transform'
          : 'bg-card'
      )}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        {isMarked && (
          <CheckCircle2
            className="absolute h-8 w-8 text-white/80 transition-opacity duration-500"
            strokeWidth={1.5}
          />
        )}
        <p
          className={cn(
            'text-xs font-medium leading-tight transition-opacity duration-300 sm:text-sm',
            isMarked && phrase !== "FREE SQUARE" ? 'opacity-20' : 'opacity-100',
            phrase === 'FREE SQUARE' && isMarked ? 'text-lg font-bold' : ''
          )}
        >
          {phrase}
        </p>
      </div>
    </div>
  );
}
