import { IconsHover } from "@/components/footer/IconsHover";
import styles from "./card.module.css";
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
    name: "LinkedIn",
  },
  {
    icon: <FaLinkedin size={24} color="black" className="social-icons" />,
    href: "#",
    name: "LinkedIn",
  },
  {
    icon: <FaLinkedin size={24} color="black" className="social-icons" />,
    href: "#",
    name: "LinkedIn",
  },
];

export default function Card({ member }: { member: Member }) {
  return (
    <div className={styles.card}>
      <main className={styles.card__info}>
        <h3>{member.name}</h3>
        <p>{member.title}</p>
      </main>

      <figure className={styles.card__img}>
        <img src={member.image} alt={member.name} />
      </figure>

      <div className={styles.card__footer}>
        <hr />
        <div className={styles.logos}>
          {socialIcons.map((social, index) => (
            <IconsHover
              key={index}
              color="black"
              social={social}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
