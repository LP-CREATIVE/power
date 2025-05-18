"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Message {
  from: "Coach" | "Player";
  name: string;
  body: string;
  timestamp: string;
}

export default function MessagingPage() {
  const [messages, setMessages] = useState<Message[]>([
    { from: "Coach", name: "Coach Phillips", body: "Be ready to go full pads tomorrow.", timestamp: "8:32 AM" },
    { from: "Player", name: "Ty Webb", body: "Got it coach. I’ll be early.", timestamp: "8:34 AM" },
    { from: "Player", name: "Hunter Buchanan", body: "Will training tape be posted today?", timestamp: "9:01 AM" },
    { from: "Coach", name: "Coach Phillips", body: "Yes, film is uploading now.", timestamp: "9:03 AM" },
  ]);

  const [body, setBody] = useState("");
  const [from, setFrom] = useState<"Coach" | "Player">("Coach");
  const [name, setName] = useState("Coach Phillips");

  const handleSend = () => {
    if (!body.trim()) return;
    setMessages(prev => [
      ...prev,
      { from, name, body, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
    setBody("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team Chat Board</h1>
        <Button onClick={handleSend}>Send</Button>
      </div>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Sender</Label>
              <select
                value={from}
                onChange={e => setFrom(e.target.value as "Coach" | "Player")}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="Coach">Coach</option>
                <option value="Player">Player</option>
              </select>
            </div>
            <div>
              <Label>Name</Label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
            </div>
          </div>
          <div>
            <Label>Message</Label>
            <Textarea
              rows={3}
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="Type your message..."
            />
          </div>
          <Button onClick={handleSend}>Send Message</Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-2">Conversation</h2>
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={cn("max-w-[75%] p-3 rounded-md", msg.from === "Coach" ? "bg-blue-100 ml-auto" : "bg-gray-100")}>  
              <div className="text-xs text-muted-foreground">
                <strong>{msg.name}</strong> • {msg.timestamp}
              </div>
              <div className="text-sm mt-1 whitespace-pre-wrap">{msg.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
