'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useBoard } from "@/hooks/use-board";
import { Button } from '@/components/ui/button';
import { Loader2, ScanLine } from 'lucide-react';
import BingoBoard from '@/components/bingo/bingo-board';
import ScanDialog from '@/components/bingo/scan-dialog';
import BingoCelebration from '@/components/bingo/bingo-celebration';
import { bingoDetectionAndResponse } from '@/ai/flows/bingo-detection-response';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function BingoPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [usedIds, setUsedIds] = useState<string[]>([]);
  const { user, userData, updateUserProgress } = useAuth();
  const board = useBoard(userData?.boardId ?? null);
  const { toast } = useToast();

  const [isScanDialogOpen, setScanDialogOpen] = useState(false);
  const [isCheckingForBingo, setCheckingForBingo] = useState(false);
  const [bingoResult, setBingoResult] = useState<{ achieved: boolean; message: string } | null>(null);

  if (!user || !userData) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!board) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading board...</span>
      </div>
    );
  }

  const checkForBingo = async (boardState: boolean[]) => {
    setCheckingForBingo(true);
    try {
      const result = await bingoDetectionAndResponse({ boardState });
      if (result.bingoAchieved) {
        setBingoResult({ achieved: true, message: result.message });
      }
    } catch (error) {
      console.error('Oops:', error);
      toast({
        variant: 'destructive',
        title: 'Info',
        description: 'It is not a Bingo yet. Please keep playing.',
      });
    } finally {
      setCheckingForBingo(false);
    }
  };

  const handleMarkSquare = async (scannedId: string) => {
    if (selectedIndex === null) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Selecciona una casilla antes de marcar.',
      });
      return;
    }

    const cleanId = scannedId.trim();
    if (!cleanId) {
      toast({
        variant: 'destructive',
        title: 'Invalid ID',
        description: 'Please enter a valid user ID.',
      });
      return;
    }

    if (cleanId === user.uid.slice(-4)) {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: "No puedes marcarte a ti mismo.",
      });
      return;
    }

    if (usedIds.includes(cleanId)) {
      toast({
        variant: 'destructive',
        title: 'ID Repetido',
        description: "Este ID ya fue usado en otra casilla.",
      });
      return;
    }

    // 🔎 Buscar usuario con ese shortId
    const q = query(collection(db, "users"), where("shortId", "==", cleanId));
    const snap = await getDocs(q);

    if (snap.empty) {
      toast({
        variant: 'destructive',
        title: 'ID inválido',
        description: "El ID no corresponde a ningún usuario registrado.",
      });
      return;
    }

    // ✅ Marcar casilla
    const newProgress = [...userData.progress];
    newProgress[selectedIndex] = true;
    await updateUserProgress(newProgress);

    setUsedIds(prev => [...prev, cleanId]);

    toast({
      title: 'Success!',
      description: `You've marked a square: "${board.phrases[selectedIndex]}"`,
      className: 'bg-accent text-accent-foreground',
    });

    setSelectedIndex(null);
    setScanDialogOpen(false);
    checkForBingo(newProgress);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="flex flex-col items-center gap-2 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline text-primary">
            {board.name}
          </h1>
          <p className="text-muted-foreground">
            Complete lines to get BINGO! Good luck, {user.displayName}.
          </p>
        </div>

        <Button
          size="lg"
          disabled={selectedIndex === null}
          onClick={() => setScanDialogOpen(true)}
        >
          <ScanLine className="mr-2 h-5 w-5" />
          Mark a Square
        </Button>
      </div>

      <BingoBoard
        phrases={board.phrases}
        progress={userData.progress}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
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
