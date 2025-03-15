import Card from "./Card";
import "./carrouselCards.css";

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
  const renderCards = (members: Member[]) => {
    return members.map((member) => <Card key={member.id} member={member} />);
  };

  return (
    <div className="carousel_">
      <div className="group">{renderCards(teamMembers)}</div>

      <div aria-hidden="false" className="group">
        {renderCards(teamMembers)}
      </div>
    </div>
  );
}
