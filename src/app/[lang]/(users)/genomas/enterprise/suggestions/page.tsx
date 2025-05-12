"use client";

import { TbPencilHeart } from "react-icons/tb";
import "./page.css";

import { useSuggestions } from "@/context/enterprise/SuggestionsPromptContext";

export default function page() {
  return (
    <section className="suggestions-Enterprise">
      <header>
        <h1>Ai-powered group suggestions and user x </h1>
        <p>
          Its Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          eaque error quisquam quia animi quis sit modi labore fuga, eos sequi,
          ipsam ut rem voluptatem natus expedita ipsa fugit tempore!{" "}
        </p>
      </header>

      <div>
        <FormSuggestions />
        <Suggestions />
      </div>
    </section>
  );
}

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

export const MessageIaSuggestions = ({
  data,
  onSelect,
}: {
  data: Record<string, string[] | undefined>;
  onSelect: (category: string, value: string) => void;
}) => {
  const titles: Record<string, string> = {
    usuario: "Usuario",
    grupos: "Grupos",
    acceso: "Acceso",
  };

  return (
    <div className="msg--bot">
      {Object.entries(data).map(([category, values]) =>
        values && values.length > 0 ? (
          <ButtonSuggestion
            key={category}
            title={titles[category] ?? category}
            values={values}
            category={category}
            onSelect={onSelect}
          />
        ) : null
      )}
    </div>
  );
};

export const ButtonSuggestion = ({
  title,
  values,
  category,
  onSelect,
}: {
  title: string;
  values: string[];
  category: string;
  onSelect: (category: string, value: string) => void;
}) => {
  return (
    <>
      {values.map((value) => (
        <button
          key={value}
          onClick={() => onSelect(category, value)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#3b82f6",
            color: "#fff",
            borderRadius: "0.375rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          {value}
        </button>
      ))}
    </>
  );
};

export const FormSuggestions = () => {
  const { getSuggestions } = useSuggestions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const userprompt = formData.get("user") as string;
    const accessPromt = formData.get("access") as string;
    const groupsPromt = formData.get("groups") as string;

    console.log({ userprompt, accessPromt, groupsPromt });

    if (!userprompt && !accessPromt && !groupsPromt) {
      console.log("something fields are required");
      return;
    }
    const prompt = `${userprompt} ${accessPromt} ${groupsPromt}`;

    const suggestions = await getSuggestions(prompt);

    console.log("Suggestions:", suggestions);

    if (suggestions.length === 0) {
      console.log("No suggestions found");
      return;
    }
  };

  return (
    <fieldset className="form-suggestions">
      <legend>
        <span className="legend-icon">
          <TbPencilHeart />
        </span>
        Configure AI Group Suggestions
      </legend>

      <p>
        Provide details about user roles, access rights, and project
        assignments. Enter comma-separated values for each field.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          User Roles
          <textarea name="user" id=""></textarea>
          <small>This field is required</small>
          <small></small>
        </label>

        <label htmlFor="">
          Access Rights
          <textarea name="access" id=""></textarea>
          <small>This field is required</small>
          <small></small>
        </label>

        <label htmlFor="">
          groups Assignments
          <textarea name="groups" id=""></textarea>
          <small>This field is required</small>
          <small></small>
        </label>

        <button>
          <TbPencilHeart />
          <span>Generate Suggestions</span>
        </button>
      </form>
    </fieldset>
  );
};

export const TypingDots = () => (
  <div className="typing-dots">
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </div>
);
