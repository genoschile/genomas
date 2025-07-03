"use client";

import { createContext, useContext, useState } from "react";

type IAStatus =
  | "idle"
  | "waiting_prompt"
  | "waiting_response"
  | "done"
  | "error";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
};

interface SuggestionsContextType {
  suggestions: string[];
  status: IAStatus;
  getSuggestions: (prompt: string) => Promise<string[]>;
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

  const getSuggestions = async (prompt: string) => {
    setStatus("waiting_prompt");

    const newMessage: Message = { role: "user", content: prompt };
    const updatedHistory = [...history, newMessage];
    setHistory(updatedHistory);

    try {
      setStatus("waiting_response");

      const res = await fetch("/api/suggestions/enterprise", {
        method: "POST",
        body: JSON.stringify({ messages: newMessage }),
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", res);

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const data = await res.json();

      if (!data?.suggestions) {
        throw new Error("Suggestions not found in response");
      }

      setSuggestions(data.suggestions);

      const aiMessage: Message = {
        role: "assistant",
        content: data.content,
      };

      setHistory([...updatedHistory, aiMessage]);
      setStatus("done");

      return data.suggestions;

    } catch (error) {
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
      value={{ suggestions, status, getSuggestions, history, addMessageToHistory }}
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
