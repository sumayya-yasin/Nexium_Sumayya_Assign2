import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: 'You are a professional translator that translates English text to Urdu. Maintain the original meaning while ensuring natural Urdu phrasing.' },
          { role: 'user', content: `Translate the following English text to Urdu just translation no sentence other than translation should be in the response:\n\n"${text}"` }
        ],
        max_tokens: 500,
        temperature: 0.3
      })
    });

    const data = await response.json();
    const translated = data.choices?.[0]?.message?.content?.trim();

    if (!translated) throw new Error('LLM returned no translation.');

    return NextResponse.json({ translated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to translate text' },
      { status: 500 }
    );
  }
}
