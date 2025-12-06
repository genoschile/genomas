type Success<T> = { data: T; error: null };
type Failure = { data: null; error: Error };
type Result<T> = Success<T> | Failure;

export async function tryCatch<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error("Unknown error"),
    };
  }
}

/*
import { tryCatch } from '@/lib/tryCatch';
import { NextResponse } from 'next/server';

export async function GET() {
  const result = await tryCatch(async () => {
    // Tu lógica de dominio, ejemplo:
    const users = await getAllUsers();
    return users;
  });

  if (result.error) {
    console.error(result.error);
    return NextResponse.json({ error: result.error.message }, { status: 500 });
  }

  return NextResponse.json({ data: result.data });
}


*/
