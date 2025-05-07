import "./sectionIntro.css"

interface SectionIntroProps {
  imageSrc: string;
  imageAlt: string;
  caption: string;
  title: string;
  subtitle: string;
}

export const SectionIntro = ({
  imageSrc,
  imageAlt,
  caption,
  title,
  subtitle,
}: SectionIntroProps) => {
  return (
    <>
      <figure className="sectionIntro--figure">
        <img src={imageSrc} alt={imageAlt} className="contact--page__image" />
        <figcaption className="contact--page__caption">{caption}</figcaption>
      </figure>

      <header className="sectionIntro--header">
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
      </header>
    </>
  );
};
