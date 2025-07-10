type Result<T> = { data: T | null; error: Error | null };

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


'use client';

import { useEffect, useState } from 'react';
import { tryCatch } from '@/lib/useTryCatch';

type User = { id: string; name: string };

export default function UserPage() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await tryCatch(async () => {
        const res = await fetch('/api/user');
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      });

      if (result.error) {
        setError(result.error);
      } else {
        setUsers(result.data.data); 
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (!users) return <div>Loading...</div>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}



*/


// utils/handleClient.ts
type ClientResult<T> = { data: T | null; error: Error | null };

export async function handleClient<T>(
  fn: () => Promise<T>,
  finallyFn?: () => void
): Promise<ClientResult<T>> {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  } finally {
    if (finallyFn) finallyFn();
  }
}

/*

import { useEffect, useState } from 'react';
import { handleClient } from '@/utils/handleClient';

export default function Page() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleClient(
      async () => {
        const res = await fetch('/api/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      },
      () => setLoading(false) // finally callback
    ).then(({ data, error }) => {
      if (error) {
        setError(error.message);
      } else {
        setData(data);
      }
    });
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}



*/
