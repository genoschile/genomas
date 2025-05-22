import { RiLoopLeftFill } from "react-icons/ri";

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
