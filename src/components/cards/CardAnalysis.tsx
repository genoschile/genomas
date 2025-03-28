import Link from "next/link";
import "./cardAnalysis.css";

export default function CardAnalysis({
  title,
  description,
  redirect,
  srcImg
}: {
  title: string;
  description: string;
  redirect: string;
  srcImg: string;
}) {
  return (
    <Link href={redirect} className="card--analysis">
      <figure className="card--analysis__image">
        <img src={`${srcImg}`} alt="ADN Icon" />
      </figure>

      <h2 className="card--analysis__title">{title}</h2>

      <p className="card--analysis__description">{description}</p>
    </Link>
  );
}
