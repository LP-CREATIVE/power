import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const promptContent = process.env.POWERCOACHPROMPT;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!promptContent || !apiKey) {
    return NextResponse.json(
      { error: 'Missing environment configuration (powercoachprompt or chatgptkey)' },
      { status: 500 }
    );
  }

  const { message } = await req.json();

  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Invalid or missing message' }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-nano",
        messages: [
          { role: "system", content: promptContent },
          { role: "user", content: message }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({ result: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
