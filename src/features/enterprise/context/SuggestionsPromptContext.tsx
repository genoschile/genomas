"use client";

import { routes } from "@/lib/api/routes";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

type ApiSuggestionsResponse = {
  success: boolean;
  message?: string;
  prompt?: string[];
  error?: string;
};

type IAStatus =
  | "idle"
  | "waiting_prompt"
  | "waiting_response"
  | "done"
  | "error";

type Message = {
  role: "user" | "assistant";
  content: string | string[];
  timestamp?: string;
};

interface SuggestionsContextType {
  suggestions: string[];
  status: IAStatus;
  getSuggestions: (prompt: string | string[]) => Promise<string[]>;
  history: Message[];
  addMessageToHistory: (message: Message) => void;
}

const SuggestionsContext = createContext<SuggestionsContextType | undefined>(
  undefined
);

export const SuggestionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [status, setStatus] = useState<IAStatus>("idle");
  const [history, setHistory] = useState<Message[]>([]);

  const getSuggestions = async (prompt: string | string[]) => {
    const normalizedPrompt = Array.isArray(prompt) ? prompt.join("\n") : prompt;
    setStatus("waiting_prompt");

    const newMessage: Message = {
      role: "user",
      content: normalizedPrompt,
      timestamp: new Date().toISOString(),
    };
    const updatedHistory = [...history, newMessage];
    setHistory(updatedHistory);

    try {
      setStatus("waiting_response");

      const res = await fetch(routes.getSuggestionsEnterpise(), {
        method: "POST",
        body: JSON.stringify({ messages: newMessage }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        toast.error("Error fetching suggestions: try later again ");
      }

      const data: ApiSuggestionsResponse = await res.json();

      if (!data.success) {
        toast.error(
          data.error || "Error fetching suggestions: try later again"
        );
        setStatus("error");
        return [];
      }

      setSuggestions(data.prompt || []);

      const aiMessage: Message = {
        role: "assistant",
        content: data.prompt ?? [],
        timestamp: new Date().toISOString(),
      };

      setHistory([...updatedHistory, aiMessage]);
      setStatus("done");

      return data.prompt ?? [];
    } catch (error) {
      toast.error("Error fetching suggestions: try later again");
      console.error("Error fetching suggestions:", error);

      setStatus("error");
      return [];
    }
  };

  function addMessageToHistory(message: Message) {
    setHistory((prevHistory) => [...prevHistory, message]);
  }

  return (
    <SuggestionsContext.Provider
      value={{
        suggestions,
        status,
        getSuggestions,
        history,
        addMessageToHistory,
      }}
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
