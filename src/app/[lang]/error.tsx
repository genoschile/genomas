"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";
import { IoReload } from "react-icons/io5";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Error occurred:", error);
  }, [error]);

  function handleReset() {
    startTransition(() => {
      reset();
      router.refresh();
    });
  }

  return (
    <div>
      <strong>
        error loading page{" "}
        <button
          className=""
          onClick={handleReset}
          title="Reload the page"
          aria-label="Reload the page"
        >
          <IoReload />
        </button>
      </strong>
    </div>
  );
}
