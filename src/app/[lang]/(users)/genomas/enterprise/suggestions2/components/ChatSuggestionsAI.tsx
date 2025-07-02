import { useSuggestions } from "@/context/enterprise/SuggestionsPromptContext";

export const ChatSuggestionsAI = () => {
  const { history, status } = useSuggestions();

  return (
    <div className="chat-list">
      {history.map((item, index) => (
        <div className="chat-item" key={index}>
          <div className="chat-message">
            <span className="message-text">{item.content}</span>
            <span className="message-status">{status}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
