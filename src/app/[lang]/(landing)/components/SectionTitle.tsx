import styles from "./sectionIntro.module.css";

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
      <figure className={styles.sectionIntro__figure}>
        <img src={imageSrc} alt={imageAlt} className="contact--page__image" />
        <figcaption className="contact--page__caption">{caption}</figcaption>
      </figure>

      <header className={styles.sectionIntro__header}>
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
      </header>
    </>
  );
};