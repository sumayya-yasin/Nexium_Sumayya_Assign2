import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    const trimmedText = text.split(" ").slice(0, 500).join(" ");

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that summarizes blog posts concisely.'
          },
          {
            role: 'user',
            content: `Summarize the following blog post in 3-5 sentences:\n\n${trimmedText}`
          }
        ],
        max_tokens: 150
      })
    });

    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    const summary = data.choices?.[0]?.message?.content?.trim();
    if (!summary) throw new Error('LLM returned no summary.');

    return NextResponse.json({ summary });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
