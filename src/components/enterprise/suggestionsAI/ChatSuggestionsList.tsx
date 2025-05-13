import { RiCodeBoxLine, RiLightbulbFlashLine, RiLoopLeftFill, RiNewspaperLine } from "react-icons/ri";

import "./chatSuggestionsList.css";

export const suggestions = [
  {
    text: "Help me plan a game night with my 5 best friends for under $100.",
    icon: <RiLightbulbFlashLine />,
  },
  {
    text: "What are the best tips to improve my public speaking skills?",
    icon: <RiLoopLeftFill />,
  },
  {
    text: "Can you help me find the latest news on web development?",
    icon: <RiNewspaperLine />,
  },
  {
    text: "Write JavaScript code to sum all elements in an array.",
    icon: <RiCodeBoxLine />,
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