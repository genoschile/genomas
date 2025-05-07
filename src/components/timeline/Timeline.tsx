import { JSX } from "react";
import "./timeline.css"

interface dataOurStory {
    title: string;
    subtitle: string;
    timeline: {
        date: string;
        title: string;
        description: string;
        icon: JSX.Element;
    }[];
}

export const Timeline = ({
    dataOurStory
}: {
    dataOurStory: dataOurStory
}) => {
  return (
    <ul className="timeline">
      {dataOurStory.timeline.map((event, index) => (
        <li className="container" key={index}>
          <figure>{event.icon}</figure>
          <div className="text-box">
            <h2>{event.title}</h2>{" "}
            <dl>
              <dt>{event.date}</dt>
              <dd>{event.title}</dd>
              {event.description && (
                <dd className="description">{event.description}</dd>
              )}
            </dl>
            <span className="arrow"></span>
          </div>
        </li>
      ))}
    </ul>
  );
};
