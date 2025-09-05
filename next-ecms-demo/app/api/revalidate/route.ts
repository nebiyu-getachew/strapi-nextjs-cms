import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }
  try {
    revalidateTag("global");
    revalidateTag("home");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (e) {
    return NextResponse.json({ revalidated: false, error: (e as Error).message }, { status: 500 });
  }
}
