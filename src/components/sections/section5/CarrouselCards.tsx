import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import "./carrouselCards.css";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface Member {
  id: number;
  name: string;
  title: string;
  image: string;
}

const teamMembers: Member[] = [
  {
    id: 1,
    name: "Dra. Karen Oróstica",
    title: "Phd Bioinformatics",
    image: "https://avatar.iran.liara.run/public",
  },
  {
    id: 2,
    name: "Dr. Ricardo",
    title: "Clinical Physician",
    image: "https://avatar.iran.liara.run/public",
  },
  {
    id: 3,
    name: "Dr. Felipe",
    title: "AI Researcher",
    image: "https://avatar.iran.liara.run/public",
  },
];

export default function Carousel() {

    const carroRef = useRef<HTMLHeadingElement | null>(null);
  
    const { observe, unobserve, entries } = useIntersectionObserver();
  
    const [isCarroVisible, setIsCarroVisible] = useState(false);
  
    useEffect(() => {
      const elements = [
        { ref: carroRef, setVisible: setIsCarroVisible },
      ];
  
      elements.forEach(({ ref }) => ref.current && observe(ref.current));
  
      return () => {
        elements.forEach(({ ref }) => ref.current && unobserve(ref.current));
      };
    }, [observe, unobserve]);
  
    useEffect(() => {
      entries.forEach((entry) => {
        if (entry.target === carroRef.current) setIsCarroVisible(entry.isIntersecting);
      });
    }, [entries]);

  const renderCards = (members: Member[]) => {
    return members.map((member) => <Card key={member.id} member={member} />);
  };

  return (
    <div ref={carroRef} className="carousel_">
      <div className="group">{renderCards(teamMembers)}</div>

      <div aria-hidden="false" className="group">
        {renderCards(teamMembers)}
      </div>
    </div>
  );
}
