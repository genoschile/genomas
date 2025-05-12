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
  const { history, suggestions } = useSuggestions();

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
                  <span className="msg--user">User</span>
                ) : (
                  <SuggestionsList
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
                )}
                <p>{msg.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </fieldset>
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

interface SuggestionData {
  usuario?: string[];
  grupos?: string[];
  acceso?: string[];
}

interface Props {
  data: SuggestionData;
  onSelect: (category: string, value: string) => void;
}

export const SuggestionsList = ({ data, onSelect }: Props) => {
  return (
    <div className="space-y-6">
      {data.usuario?.length > 0 && (
        <ButtonSuggestion
          title="Usuario"
          values={data.usuario}
          category="usuario"
          onSelect={onSelect}
        />
      )}

      {data.grupos?.length > 0 && (
        <ButtonSuggestion
          title="Grupos"
          values={data.grupos}
          category="grupos"
          onSelect={onSelect}
        />
      )}

      {data.acceso?.length > 0 && (
        <ButtonSuggestion
          title="Acceso"
          values={data.acceso}
          category="acceso"
          onSelect={onSelect}
        />
      )}
    </div>
  );
};

interface SectionProps {
  title: string;
  values: string[];
  category: string;
  onSelect: (category: string, value: string) => void;
}

const ButtonSuggestion = ({ title, values, category, onSelect }: SectionProps) => {
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
  const { getSuggestions, currentPrompt } = useSuggestions();

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
