import "./card.css";
import { FaLinkedin } from "react-icons/fa";

interface Member {
  name: string;
  title: string;
  image: string;
}

export default function Card({ member, key }: { member: Member; key: number }) {
  return (
    <div key={key} className="card">
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
            <FaLinkedin />
            <FaLinkedin />
            <FaLinkedin />
        </div>
      </div>
    </div>
  );
}
