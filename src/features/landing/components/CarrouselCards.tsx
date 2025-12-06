import { useTranslations } from "@/features/lang/context/I18nClientProvider";
import Card from "./Card";
import styles from "./carrouselCards.module.css";

interface Member {
  id: number;
  name: string;
  title: string;
  image: string;
}

export default function Carousel() {
  const renderCards = (members: Member[]) => {
    return members.map((member) => <Card key={member.id} member={member} />);
  };

  const { t } = useTranslations();

  const teamMembers: Member[] = [
    {
      id: 1,
      name: t("landing.section5.card.0.name"),
      title: t("landing.section5.card.0.title"),
      image: "/profile.png", // Placeholder image, replace with actual image URL
    },
    {
      id: 2,
      name: t("landing.section5.card.1.name"),
      title: t("landing.section5.card.1.title"),
      image: "/profile.png", // Placeholder image, replace with actual image URL
    },
    {
      id: 3,
      name: t("landing.section5.card.2.name"),
      title: t("landing.section5.card.2.title"),
      image: "/profile.png", // Placeholder image, replace with actual image URL
    },
  ];

  return (
    <div className={styles.carousel_}>
      <div className={styles.group}>{renderCards(teamMembers)}</div>

      <div aria-hidden="false" className={styles.group}>
        {renderCards(teamMembers)}
      </div>
    </div>
  );
}
