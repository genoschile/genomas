import "./chatSuggestionsList.css";

import {
  RiTeamLine,
  RiShieldUserLine,
  RiGroupLine,
  RiLightbulbFlashLine,
} from "react-icons/ri";

export const suggestions = [
  {
    text: "Suggest optimal group configurations based on roles like Developer, QA, and Manager.",
    icon: <RiTeamLine />,
  },
  {
    text: "Assign access rights for each role: who can read, write, or deploy?",
    icon: <RiShieldUserLine />,
  },
  {
    text: "Distribute users across projects: Alpha Team, Beta Team, etc.",
    icon: <RiGroupLine />,
  },
  {
    text: "Generate smart recommendations for cross-functional team assignments.",
    icon: <RiLightbulbFlashLine />,
  },
];

export const ChatSuggestionsList = () => {
  return (
    <ul className="suggestion-list">
      {suggestions.map((item, index) => (
        <li className="suggestion" key={index}>
          <h4 className="text">{item.text}</h4>
          <span className="icon material-symbols-rounded">{item.icon}</span>
        </li>
      ))}
    </ul>
  );
};
