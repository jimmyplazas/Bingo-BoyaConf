'use client';
import Link from 'next/link';
import { UserNav } from '@/components/auth/user-nav';
import { AppIcon } from '@/components/icons';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '../ui/button';

export default function Header() {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/bingo" className="mr-8 flex items-center">
          <AppIcon className="h-8 w-8 text-primary" />
          <span className="ml-2 hidden text-lg font-bold sm:inline-block font-headline">
            BoyaConf Bingo
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-4">
          {user?.isAdmin && (
            <Button variant="ghost" asChild>
              <Link href="/admin">Admin Dashboard</Link>
            </Button>
          )}
        </nav>
        <div className="flex items-center justify-end space-x-4">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
