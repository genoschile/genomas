import { NextResponse } from "next/server";
import { getSession, setSession, removeSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: session });
}

export async function POST(req: Request) {
  const { userId, metadata } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  await setSession(userId, metadata);

  return NextResponse.json({ message: "Session created" });
}

export async function DELETE() {
  removeSession();
  return NextResponse.json({ message: "Session deleted" });
}

/*
create sessions

await fetch('/api/session', {
  method: 'POST',
  body: JSON.stringify({ userId: 123, metadata: { role: 'admin' } }),
  headers: {
    'Content-Type': 'application/json',
  },
});

verify session

const res = await fetch('/api/session', {
  method: 'GET',
  credentials: 'include',
});
const data = await res.json();


delete sessions

await fetch('/api/session', {
  method: 'DELETE',
});


*/
