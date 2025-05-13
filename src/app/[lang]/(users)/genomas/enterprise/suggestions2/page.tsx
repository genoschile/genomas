import { RiLoopLeftFill } from "react-icons/ri";

import "./page.css";

import { ChatSuggestionsList } from "@/components/enterprise/suggestionsAI/ChatSuggestionsList";

export default function page() {
  return (
    <>
      <ChatSuggestionTitle />

      <ChatSuggestionsList />

      <ChatSuggestionsAI />

      <TypingSuggestionsAI />
    </>
  );
}

export const ChatSuggestionTitle = () => {
  return (
    <header className="header">
      <h1 className="title">Hello, there</h1>
      <p className="subtitle">How can I help you today?</p>
    </header>
  );
};

export const ChatSuggestionsAI = () => {
  return <div className="chat-list" >
  </div>;
};

export const TypingSuggestionsAI = () => {
  return (
    <div className="typing-area">
      <form action="#" className="typing-form">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter a prompt here"
            className="typing-input"
            required
          />
          <button
            id="send-message-button"
            className="icon material-symbols-rounded"
          >
            <RiLoopLeftFill />
          </button>
        </div>
        <div className="action-buttons">
          <span
            id="theme-toggle-button"
            className="icon material-symbols-rounded"
          >
            <RiLoopLeftFill />
          </span>
        </div>
      </form>
      <p className="disclaimer-text">
        Gemini may display inaccurate info, including about people, so
        double-check its responses.
      </p>
    </div>
  );
};
