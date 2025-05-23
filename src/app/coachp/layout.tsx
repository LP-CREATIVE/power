import type { ReactNode } from 'react';

export default function CoachPLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="w-full px-6 py-4 border-b border-border bg-card text-card-foreground">
        <h1 className="text-2xl font-bold text-primary">Coach P</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Your personal AI performance coach for training, mindset, and improvement.
        </p>
      </header>

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">{children}</main>
    </div>
  );
}
