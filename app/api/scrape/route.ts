import { NextResponse } from 'next/server';
import { scrapeBlogText } from '@/utils/scrapper';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }
    
    const text = await scrapeBlogText(url);
    
    return NextResponse.json({ text });
    
  } catch (err: unknown) {
  let errorMessage = "Internal Server Error";

  if (err instanceof Error) {
    errorMessage = err.message;
  }

  return NextResponse.json({ error: errorMessage }, { status: 500 });
}

}