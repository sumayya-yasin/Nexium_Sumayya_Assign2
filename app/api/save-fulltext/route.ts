import { NextResponse } from "next/server";
import { saveFullText } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { url, text } = body;

    if (!url || !text) {
      return NextResponse.json({ error: "Missing URL or text" }, { status: 400 });
    }

    const result = await saveFullText(url, text);

    return NextResponse.json({ success: true, id: result._id });
  } catch (err: unknown) {
  let errorMessage = "Internal Server Error";

  if (err instanceof Error) {
    errorMessage = err.message;
  }

  return NextResponse.json({ error: errorMessage }, { status: 500 });
}

}
