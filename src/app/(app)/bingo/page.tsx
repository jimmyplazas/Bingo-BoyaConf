'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { BOARDS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Loader2, ScanLine } from 'lucide-react';
import BingoBoard from '@/components/bingo/bingo-board';
import ScanDialog from '@/components/bingo/scan-dialog';
import BingoCelebration from '@/components/bingo/bingo-celebration';
import { bingoDetectionAndResponse } from '@/ai/flows/bingo-detection-response';
import { useToast } from '@/hooks/use-toast';

export default function BingoPage() {
  const { user, userData, updateUserProgress } = useAuth();
  const { toast } = useToast();
  const [isScanDialogOpen, setScanDialogOpen] = useState(false);
  const [isCheckingForBingo, setCheckingForBingo] = useState(false);
  const [bingoResult, setBingoResult] = useState<{ achieved: boolean; message: string } | null>(null);

  if (!userData || !user) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const currentBoard = BOARDS[userData.boardId];
  if (!currentBoard) {
    return <div>Error: Board not found.</div>;
  }

  const checkForBingo = async (boardState: boolean[]) => {
    setCheckingForBingo(true);
    try {
      const result = await bingoDetectionAndResponse({ boardState });
      if (result.bingoAchieved) {
        setBingoResult({ achieved: true, message: result.message });
      }
    } catch (error) {
      console.error('Error checking for bingo:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not check for Bingo. Please try again.',
      });
    } finally {
      setCheckingForBingo(false);
    }
  };

  const handleMarkSquare = (scannedId: string) => {
    if (!scannedId.trim()) {
      toast({ variant: 'destructive', title: 'Invalid ID', description: 'Please enter a valid user ID.' });
      return;
    }

    if (scannedId.trim().toLowerCase() === user.uid.toLowerCase()) {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: "You can't mark yourself on the bingo card!",
      });
      return;
    }

    // In a real app, you'd find the phrase that corresponds to this action/user.
    // For this mock, we assume any valid user ID can mark the next available square.
    // A more robust implementation would match the scannedId to a phrase.
    const nextUnmarkedIndex = userData.progress.findIndex(p => !p);

    if (nextUnmarkedIndex === -1) {
      toast({ title: 'Board Full!', description: 'You have marked all squares.' });
      return;
    }

    const newProgress = [...userData.progress];
    newProgress[nextUnmarkedIndex] = true;
    updateUserProgress(newProgress);
    toast({
      title: 'Success!',
      description: `You've marked a square: "${currentBoard.phrases[nextUnmarkedIndex]}"`,
      className: 'bg-accent text-accent-foreground',
    });
    setScanDialogOpen(false);
    checkForBingo(newProgress);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="flex flex-col items-center gap-2 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline text-primary">{currentBoard.name}</h1>
          <p className="text-muted-foreground">Complete lines to get BINGO! Good luck, {user.displayName}.</p>
        </div>
        <Button size="lg" onClick={() => setScanDialogOpen(true)}>
          <ScanLine className="mr-2 h-5 w-5" />
          Mark a Square
        </Button>
      </div>

      <BingoBoard
        phrases={currentBoard.phrases}
        progress={userData.progress}
        isCheckingForBingo={isCheckingForBingo}
      />
      
      <ScanDialog
        isOpen={isScanDialogOpen}
        onClose={() => setScanDialogOpen(false)}
        onScan={handleMarkSquare}
      />

      {bingoResult?.achieved && (
        <BingoCelebration
          message={bingoResult.message}
          onClose={() => setBingoResult(null)}
        />
      )}
    </div>
  );
}
