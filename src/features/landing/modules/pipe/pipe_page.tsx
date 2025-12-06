"use client";

import CardAnalysis from "@/components/cards/CardAnalysis";
import "./page.css";
import { AuthFormLogo } from "@/features/auth/components/AuthFormLogo";
import { useTranslations } from "@/features/lang/context/I18nClientProvider";

export const PipePage = () => {
  const { t } = useTranslations();

  const infoCard = [
    {
      title: t("genomas.card.0.title"),
      description: t("genomas.card.0.description"),
      href: "#",
      srcImg: "/images/adn.png",
    },
    {
      title: t("genomas.card.1.title"),
      description: t("genomas.card.1.description"),
      href: "#",
      srcImg: "/images/germinal.png",
    },
    {
      title: t("genomas.card.2.title"),
      description: t("genomas.card.2.description"),
      href: "#",
      srcImg: "/images/germinal.png",
    },
  ];

  return (
    <div className="container--genomas">
      <article className="container--genomas__main">
        <AuthFormLogo />

        <ul>
          {infoCard.map(({ title, description, href, srcImg }, index) => {
            return (
              <li key={index}>
                <CardAnalysis
                  srcImg={srcImg}
                  title={title}
                  description={description}
                  redirect={href}
                  key={index}
                />
              </li>
            );
          })}
        </ul>
      </article>
    </div>
  );
};
