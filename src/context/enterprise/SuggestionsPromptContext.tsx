"use client";

import { createContext, useContext, useState } from "react";

type IAStatus = "idle" | "waiting_prompt" | "waiting_response" | "done" | "error";

interface SuggestionsContextType {
  currentPrompt: string | null;
  suggestions: string[];
  status: IAStatus;
  getSuggestions: (prompt: string) => Promise<string[]>;
}

const SuggestionsContext = createContext<SuggestionsContextType | undefined>(undefined);

export const SuggestionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [status, setStatus] = useState<IAStatus>("idle");

  const getSuggestions = async (prompt: string) => {
    setStatus("waiting_prompt");
    setCurrentPrompt(prompt);

    try {
      setStatus("waiting_response");

      const res = await fetch("/api/suggestions/enterprise", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const data = await res.json();

      if (!data?.suggestions) {
        throw new Error("Suggestions not found in response");
      }

      setSuggestions(data.suggestions);
      setStatus("done");

      return data.suggestions;
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setStatus("error");
      return [];
    }
  };

  return (
    <SuggestionsContext.Provider
      value={{ currentPrompt, suggestions, status, getSuggestions }}
    >
      {children}
    </SuggestionsContext.Provider>
  );
};




export const useSuggestions = () => {
  const context = useContext(SuggestionsContext);
  if (!context) {
    throw new Error("useSuggestions must be used within a SuggestionsProvider");
  }
  return context;
};
