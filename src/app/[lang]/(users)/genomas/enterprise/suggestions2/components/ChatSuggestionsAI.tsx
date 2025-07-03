import { useSuggestions } from "@/context/enterprise/SuggestionsPromptContext";
import "./chatSuggestionsAI.css";

export const ChatSuggestionsAI = () => {
  const { history, status } = useSuggestions();

  return (
    <ul className="chat-list">
      {history.map((item, index) => (
        <li
          className={`chat-item ${item.role === "assistant" ? "bot" : "user"}`}
          key={index}
        >
          <div className="chat-message">
            <span className="message-text">{item.content}</span>
            <span className="message-status">{status}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
