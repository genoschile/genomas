"use client";

import "./page.css";
import { ChatSuggestionsList } from "@/components/enterprise/suggestionsAI/ChatSuggestionsList";
import { ChatSuggestionTitle } from "@/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";
import { TypingSuggestionsAI } from "./components/TypingSuggestionsAI";
import { ChatSuggestionsAI } from "./components/ChatSuggestionsAI";
import { useSuggestions } from "@/context/enterprise/SuggestionsPromptContext";

export default function page() {
  const { history, status } = useSuggestions();

  return (
    <>
      <ChatSuggestionTitle
        title="Hello there"
        description="How can i help you?"
      />

      <main className="chat-container">
        <article className="chat-messages">
          {history.length === 0 ? (
            <ChatSuggestionsList />
          ) : (
            <ChatSuggestionsAI />
          )}
        </article>

        <footer className="typing-footer typing-area">
          <TypingSuggestionsAI />
        </footer>
      </main>
    </>
  );
}
