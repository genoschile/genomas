import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type AccordionItem = {
  title: string;
  content: string;
};

type AccordionListProps = {
  items: AccordionItem[];
};

export const AccordionList = ({ items }: AccordionListProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<HTMLDivElement[]>([]);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, idx) => {
      if (ref) {
        ref.style.maxHeight =
          idx === openIndex ? `${ref.scrollHeight}px` : "0px";
      }
    });
  }, [openIndex]);

  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={index} className={`item ${openIndex === index ? "show" : ""}`}>
          <div className="title">
            <h4>{item.title}</h4>
            <button
              onClick={() => toggleItem(index)}
              className={`toggle ${openIndex === index ? "rotate" : ""}`}
            >
              <IoIosArrowDown />
            </button>
          </div>
          <div
            className="content"
            ref={(el) => {
              if (el) contentRefs.current[index] = el;
            }}
          >
            {item.content}
          </div>
        </li>
      ))}
    </ul>
  );
};
