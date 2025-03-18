import "./cardAnalysis.css";

export default function CardAnalysis({
  title,
  description,
  redirect,
}: {
  title: string;
  description: string;
  redirect: string;
}) {
  return (
    <a href={redirect} className="card--analysis">
      <figure className="card--analysis__image">
        <img src="/images/adn.png" alt="ADN Icon" />
      </figure>

      <h2 className="card--analysis__title">{title}</h2>

      <p className="card--analysis__description">{description}</p>
    </a>
  );
}
