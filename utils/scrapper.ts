import { load } from 'cheerio';

export async function scrapeBlogText(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    const $ = load(html);
    
    let text = $('body').text() || '';
    
    text = text
      .replace(/\s+/g, ' ') 
      .replace(/\n+/g, ' ') 
      .trim();
    
    return text;
  } catch (error) {
    throw error;
  }
}