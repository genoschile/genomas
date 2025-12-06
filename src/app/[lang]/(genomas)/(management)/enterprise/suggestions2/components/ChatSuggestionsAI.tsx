import { useSuggestions } from "@/features/enterprise/context/SuggestionsPromptContext";
import "./chatSuggestionsAI.css";
import { MdContentCopy } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { TypingDots } from "./TypingDots";
import { useEffect } from "react";
import { toast } from "react-toastify";

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
              <li
                aria-label="Copy suggestion"
                onClick={() => {
                  const textToCopy = Array.isArray(item.content)
                    ? item.content.join("\n")
                    : item.content;

                  navigator.clipboard
                    .writeText(textToCopy)
                    .then(() => {
                      toast.success("¡Texto copiado al portapapeles!");
                    })
                    .catch(() => {
                      toast.error("No se pudo copiar el texto.");
                    });
                }}
              >
                <MdContentCopy />
              </li>

              {/* <li aria-label="Edit suggestion">
                <FaRegEdit />
              </li> */}
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
