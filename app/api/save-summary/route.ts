import { NextResponse } from "next/server";
import { saveSummary } from "@/lib/supabaseAdmin";

export async function POST(req: Request) 
{
  try 
  {
    const { url, summary, urdu } = await req.json();

    if (!url || !summary || !urdu) 
    {
      return NextResponse.json(
        { error: "Missing URL, summary, or urduSummary" },
        { status: 400 }
      );
    }

    const result = await saveSummary(url, summary, urdu);

    return NextResponse.json({ success: true, id: result.id });
  } 
  catch (err: unknown) {
  let errorMessage = "Internal Server Error";

  if (err instanceof Error) {
    errorMessage = err.message;
  }

  return NextResponse.json({ error: errorMessage }, { status: 500 });
}

}
