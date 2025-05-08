import { IconsHover } from "@/components/footer/IconsHover";
import "./card.css";
import { FaLinkedin } from "react-icons/fa";

interface Member {
  name: string;
  title: string;
  image: string;
}

const socialIcons = [
  {
    icon: <FaLinkedin size={24} color="black" className="social-icons" />,
    href: "#",
  },
  {
    icon: <FaLinkedin size={24} color="black" className="social-icons" />,
    href: "#",
  },
  {
    icon: <FaLinkedin size={24} color="black" className="social-icons" />,
    href: "#",
  },
];

export default function Card({ member }: { member: Member }) {
  return (
    <div className="card">
      <main className="card__info">
        <h3>{member.name}</h3>
        <p>{member.title}</p>
      </main>

      <figure className="card__img">
        <img src={member.image} alt={member.name} />
      </figure>

      <div className="card__footer">
        <hr />
        <div className="logos">
          {socialIcons.map((social, index) => (
            <IconsHover key={index} color="black" social={social} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
