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
    <a
      href={redirect}
      className="bg-color-card border-2 p-2 flex flex-col justify-center items-center border-color-secondary cursor-pointer hover:shadow-md"
    >
      <figure className="h-9 w-9">
        <img src="/images/adn.png" className="w-full h-full " alt="" />
      </figure>

      <h2>{title}</h2>

      <p>{description}</p>
    </a>
  );
}
