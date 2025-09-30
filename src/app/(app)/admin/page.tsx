'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { USERS, BOARDS, USER_DATA, User, Board, UserData } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.replace('/bingo');
    }
  }, [user, loading, router]);

  if (loading || !user || !user.isAdmin) {
    return null;
  }
  
  const players = Object.values(USERS);
  const boards = Object.values(BOARDS);

  const getPlayerProgress = (uid: string) => {
    const data = USER_DATA[uid];
    if (!data) return { percentage: 0, boardName: 'N/A' };
    const total = data.progress.length;
    const completed = data.progress.filter(Boolean).length;
    const boardName = BOARDS[data.boardId]?.name || 'Unknown Board';
    return {
      percentage: Math.round((completed / total) * 100),
      boardName,
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline text-primary mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{players.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Available Boards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{boards.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Player Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Board</TableHead>
                <TableHead className="w-[200px]">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => {
                const { percentage, boardName } = getPlayerProgress(player.uid);
                return (
                  <TableRow key={player.uid}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={player.photoURL} alt={player.displayName} />
                          <AvatarFallback>{player.displayName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{player.displayName}</div>
                          <div className="text-sm text-muted-foreground">{player.email}</div>
                        </div>
                        {player.isAdmin && <Badge variant="destructive">Admin</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>{boardName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={percentage} className="w-full" />
                        <span className="text-sm font-medium text-muted-foreground">{percentage}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Bingo Boards</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
            {boards.map(board => (
                <Card key={board.id}>
                    <CardHeader>
                        <CardTitle>{board.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {board.phrases.slice(0, 5).map((phrase, i) => <li key={i}>{phrase}</li>)}
                            <li>...and 20 more</li>
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
