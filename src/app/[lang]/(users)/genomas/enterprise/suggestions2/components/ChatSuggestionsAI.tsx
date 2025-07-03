import { useSuggestions } from "@/context/enterprise/SuggestionsPromptContext";
import "./chatSuggestionsAI.css";
import { MdContentCopy } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { TypingDots } from "./TypingDots";
import { useEffect } from "react";

export const ChatSuggestionsAI = () => {
  const { history, status } = useSuggestions();

  useEffect(() => {
    const chatList = document.querySelector(".chat-list");
    if (chatList) {
      chatList.scrollTop = chatList.scrollHeight;
    }
  }, [history, status]);

  return (
    <ul className="chat-list">
      {history.map((item, index) => (
        <li
          className={`chat-item ${item.role === "assistant" ? "bot" : "user"}`}
          key={index}
        >
          <p className="message-text">{item.content}</p>
          <span className="message-status">{status}</span>

          <footer className="chat-footer">
            <ul>
              <li aria-label="Copy suggestion">
                <MdContentCopy />
              </li>

              <li aria-label="Edit suggestion">
                <FaRegEdit />
              </li>
            </ul>
          </footer>
          <time className="message-time">
            {new Date().toLocaleTimeString()}
          </time>
        </li>
      ))}

      {status === "waiting_response" && (
        <li className="chat-item bot">
          <div className="message">
            <TypingDots />
          </div>
        </li>
      )}

      {status === "error" && (
        <p className="error-message">
          ⚠️ Ocurrió un error. Intenta nuevamente.
        </p>
      )}
    </ul>
  );
};
