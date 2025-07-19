import "./typingSuggestionsAI.css";

import { useSuggestions } from "@/context/enterprise/SuggestionsPromptContext";
import { useModalContext } from "@/hooks/useModalsProject";
import { RiLoopLeftFill } from "react-icons/ri";
import { TbPencilHeart } from "react-icons/tb";

export const TypingSuggestionsAI = () => {
  const { openModal } = useModalContext();
  const { status, getSuggestions } = useSuggestions();

  function handleForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const input = event.currentTarget.querySelector(
      ".typing-input"
    ) as HTMLInputElement;

    const message = input.value.trim();
    if (!message) return;

    input.value = "";
    getSuggestions(message);
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
            aria-busy={status === "waiting_response"}
            aria-disabled={status === "waiting_response"}
            type="text"
            placeholder="Enter a prompt here"
            className="typing-input"
            required
            disabled={status === "waiting_response"}
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
