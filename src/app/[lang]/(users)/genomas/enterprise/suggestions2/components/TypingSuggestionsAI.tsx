import "./typingSuggestionsAI.css";

import { useSuggestions } from "@/context/enterprise/SuggestionsPromptContext";
import { useModalContext } from "@/hooks/useModalsProject";
import { RiLoopLeftFill } from "react-icons/ri";
import { TbPencilHeart } from "react-icons/tb";

export const TypingSuggestionsAI = () => {
  const { openModal } = useModalContext();
  const { addMessageToHistory } = useSuggestions();

  function handleForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.querySelector(
      ".typing-input"
    ) as HTMLInputElement;
    const message = input.value.trim();
    if (message) {
      console.log("Message sent:", message);
      input.value = ""; // Clear the input after sending
      addMessageToHistory({
        role: "user",
        content: message,
      });
    }
  }

  return (
    <>
      <form onSubmit={handleForm} className="typing-form">
        <div className="action-buttons">
          <span
            id="theme-toggle-button"
            className="icon material-symbols-rounded eyes-attention"
            onClick={() => openModal("helper_suggestions")}
          >
            <TbPencilHeart />
          </span>
        </div>
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
    </>
  );
};
