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
  return (
    <fieldset className="suggestions">
      <legend>Suggested Groups</legend>

      <p>
        Review the ai-generated groups and select the ones you want to add to
        your
      </p>

      <IASuggestions />
    </fieldset>
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
    const prompt = `Generate a list of groups based on the following information, solo debes responder con los nombres de los grupos, no es necesario dar explicaciones ni detalles adicionales:
    User Roles: ${userprompt}
    Access Rights: ${accessPromt}
    Groups Assignments: ${groupsPromt}`;

    const suggestions = await getSuggestions(prompt);
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

export const IASuggestions = () => {
  const { currentPrompt, status, suggestions } = useSuggestions();
  return (
    <div>
      {status === "idle" && <p>Waiting for prompt input...</p>}
      {status === "waiting_prompt" && <p>Sending prompt to AI...</p>}
      {status === "waiting_response" && <p>Waiting for AI response...</p>}
      {status === "done" && (
        <ul>
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
      {status === "error" && <p>There was an error fetching suggestions.</p>}
    </div>
  );
};
