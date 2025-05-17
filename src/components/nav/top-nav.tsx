"use client";

import type { ReactNode } from "react";
import Container from "../container";
import { ThemeToggle } from "../theme-toggle";

export default function TopNav({ title }: { title: ReactNode }) {
  return (
    <Container className="flex h-16 items-center justify-between border-b border-border">
      <div className="text-2xl font-medium">{title}</div>
      <ThemeToggle />
    </Container>
  );
}
