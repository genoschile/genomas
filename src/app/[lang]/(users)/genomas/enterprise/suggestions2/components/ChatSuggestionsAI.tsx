"use client";

import { useSuggestions } from "@/context/enterprise/SuggestionsPromptContext";

export const ChatSuggestionsAI = () => {
  const { history, status } = useSuggestions();

  return <div className="chat-list"></div>;
};
