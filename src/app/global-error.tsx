"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <h1>¡Ups! Algo salió mal 😥</h1>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Reintentar</button>
      </body>
    </html>
  );
}
