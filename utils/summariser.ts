export async function generateSummary(text: string): Promise<string> {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that summarizes blog posts concisely.' },
        { role: 'user', content: `Summarize the following blog post in 3-5 sentences:\n\n${text}` }
      ],
      max_tokens: 150
    })
  });

  const data = await response.json();
  const message = data.choices?.[0]?.message?.content;

  if (!message) throw new Error('LLM returned no content.');

  return message.trim();
}
