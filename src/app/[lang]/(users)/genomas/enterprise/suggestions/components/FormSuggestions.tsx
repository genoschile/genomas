import { useSuggestions } from "@/context/enterprise/SuggestionsPromptContext";
import { TbPencilHeart } from "react-icons/tb";

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