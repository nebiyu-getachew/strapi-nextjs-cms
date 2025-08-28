import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const url = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const token = process.env.STRAPI_TOKEN;
  if (!token) return NextResponse.json({ error: "Missing STRAPI_TOKEN" }, { status: 500 });

  const res = await fetch(`${url}/api/intakes`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ data: body }),
  });

  const json = await res.json();
  if (!res.ok) return NextResponse.json({ error: json?.error || "Failed" }, { status: 500 });
  return NextResponse.json({ ok: true, id: json?.data?.id });
}
