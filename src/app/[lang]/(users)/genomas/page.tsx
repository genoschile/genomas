"use client"

import CardAnalysis from "@/components/cards/CardAnalysis";
import { HeaderUserWorkspace } from "@/components/headers/HeaderUserWorkspace";
import "./page.css";
import { FooterLanding } from "@/components/footer/FooterLanding";
import { AuthFormLogo } from "@/components/forms/components/AuthFormLogo";
import { useTranslations } from "../../../../context/I18nClientProvider";

export default function page() {

  const { t } = useTranslations();

  const infoCard = [
    {
      title: t("genomas.card.0.title"),
      description: t("genomas.card.0.description"),
      href: "/genomas/user",
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
    <>
      <div className="container--genomas">
        <HeaderUserWorkspace />

        <main className="container--genomas__main">
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
        </main>
      </div>
      <FooterLanding />
    </>
  );
}
