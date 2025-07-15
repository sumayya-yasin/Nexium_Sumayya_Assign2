export async function translateToUrdu(text: string): Promise<string> {
  try {
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
            content: 'You are a professional translator that translates English text to Urdu. Maintain the original meaning while ensuring natural Urdu phrasing. Preserve technical terms if needed.'
          },
          {
            role: 'user',
            content: `Translate the following English text to Urdu:\n\n"${text}"`
          }
        ],
        max_tokens: 500,
        temperature: 0.3
      })
    });

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content;

    if (!message) throw new Error('LLM returned no content.');

    return message.trim();
  } catch (error) {
    console.error('Translation error:', error);
    return simpleDictionaryTranslate(text);
  }
}

// Fallback dictionary translation
function simpleDictionaryTranslate(text: string): string {
  const urduDictionary: Record<string, string> = {
    "summary": "خلاصہ",
    "blog": "بلاگ",
    "post": "پوسٹ",
    "article": "مقالہ",
    "the": "",
    "and": "اور",
    "is": "ہے",
    "in": "میں",
    "to": "کو",
    "of": "کا",
    "for": "کیلئے",
    "with": "کے ساتھ",
    "on": "پر",
    "that": "جو",
    "this": "یہ",
    "as": "جیسے",
    "it": "یہ",
    "by": "کے ذریعے",
    "are": "ہیں",
    "was": "تھا",
    "were": "تھے",
    "be": "ہونا",
    "at": "پر",
    "from": "سے",
    "up": "اوپر",
    "out": "باہر",
    "about": "کی بات",
    "into": "میں",
    "over": "کے اوپر",
    "after": "کے بعد",
    "before": "سے پہلے",
    "through": "کے ذریعے",
    "during": "کے دوران",
    "between": "کے درمیان",
    "under": "نیچے",
    "again": "دوبارہ",
    "further": "مزید",
    "then": "پھر",
    "once": "ایک بار",
    "here": "یہاں",
    "there": "وہاں",
    "when": "جب",
    "where": "جہاں",
    "why": "کیوں",
    "how": "کیسے",
    "all": "سبھی",
    "any": "کوئی بھی",
    "both": "دونوں",
    "each": "ہر",
    "few": "کچھ",
    "more": "زیادہ",
    "most": "بیشتر",
    "other": "دوسرے",
    "some": "کچھ",
    "such": "ایسے",
    "no": "نہیں",
    "nor": "اور نہیں",
    "not": "نہیں",
    "only": "صرف",
    "own": "اپنا",
    "same": "اسی",
    "so": "اتنا",
    "than": "سے",
    "too": "بھی",
    "very": "بہت",
    "s": "",
    "can": "سکتے ہیں",
    "will": "کریں گے",
    "just": "صرف",
    "should": "چاہیے",
    "now": "اب",
    "don't": "مجھے نہیں",
    "aren't": "نہیں ہیں",
    "wouldn't": "نہیں کریں گے",
    "couldn't": "نہیں کرسکتے"
  };

  let translated = text;

  Object.entries(urduDictionary).forEach(([english, urdu]) => {
    const regex = new RegExp(`\\b${english}\\b`, 'gi');
    translated = translated.replace(regex, urdu);
  });

  return translated;
}
