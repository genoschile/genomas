import { useSuggestions } from "@/context/enterprise/SuggestionsPromptContext";
import { MessageIaSuggestions } from "./MessageIaSuggestions";
import { TypingDots } from "./TypingDots";

export const Suggestions = () => {
  const { history, status } = useSuggestions();

  return (
    <fieldset className="suggestions">
      <legend>Suggested Groups</legend>

      <p>
        Review the ai-generated groups and select the ones you want to add to
        your
      </p>

      <div className="suggestions-chat">
        <IASuggestionsStatus />
        <div className="suggestions-chat--messages">
          <ul>
            {history.map((msg, idx: number) => (
              <li key={idx} className={`msg ${msg.role}`}>
                {msg.role === "user" ? (
                  <>
                    <MessageUserSuggestions />
                    <p>{msg.content}</p>
                  </>
                ) : (
                  <>
                    <MessageIaSuggestions
                      data={{
                        usuario: ["Soldado", "Cabo"],
                        grupos: ["Infantería"],
                        acceso: ["Total"],
                      }}
                      onSelect={(category, value) => {
                        console.log(
                          `Seleccionaste ${value} de la categoría ${category}`
                        );
                      }}
                    />
                    <p>{msg.content}</p>
                  </>
                )}
              </li>
            ))}
            {status === "waiting_response" && (
              <li className="msg msg--bot">
                <TypingDots />
              </li>
            )}
          </ul>
        </div>
      </div>
    </fieldset>
  );
};

export const MessageUserSuggestions = () => {
  return (
    <div className="msg--user">
      <p>What groups should I add to this user?</p>
    </div>
  );
};

export const IASuggestionsStatus = () => {
  const { status } = useSuggestions();
  return (
    <div className="suggestions-chat--info">
      {status === "idle" && <p>Waiting for prompt input...</p>}
      {status === "waiting_prompt" && <p>Sending prompt to AI...</p>}
      {status === "waiting_response" && <p>Waiting for AI response...</p>}
      {status === "done" && <p>AI Resposne ok</p>}
      {status === "error" && <p>There was an error fetching suggestions.</p>}
    </div>
  );
};
