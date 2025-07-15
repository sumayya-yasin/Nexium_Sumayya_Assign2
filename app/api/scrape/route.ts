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
    
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to scrape website' },
      { status: 500 }
    );
  }
}