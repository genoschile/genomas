import "./page.css";
import { ChatSuggestionsList } from "@/components/enterprise/suggestionsAI/ChatSuggestionsList";
import { ChatSuggestionTitle } from "@/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";
import { TypingSuggestionsAI } from "./components/TypingSuggestionsAI";
import { ChatSuggestionsAI } from "./components/ChatSuggestionsAI";

export default function page() {
  return (
    <>
      <ChatSuggestionTitle
        title="Hello there"
        description="How can i help you?"
      />

      <ChatSuggestionsList />

      <ChatSuggestionsAI />

      <TypingSuggestionsAI />
    </>
  );
}
