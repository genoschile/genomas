import CardAnalysis from "@/components/cards/CardAnalysis";
import { HeaderUserWorkspace } from "@/components/headers/HeaderUserWorkspace";
import "./page.css";
import Footer from "@/components/footer/FooterLanding";
import { AuthFormLogo } from "@/components/forms/components/AuthFormLogo";

const infoCard = [
  {
    title: "Cancer Variants Analysis",
    description: "OncoKB-powered annotation and AI-driven insights",
    href: "/genomas/user",
    srcImg: "/images/adn.png",
  },
  {
    title: "Germline Variants Analysis",
    description: "Pharmacogenomics and AI-driven insights",
    href: "#",
    srcImg: "/images/germinal.png",
  },
  {
    title: "Bla Variants Analysis",
    description: "Next Pipeles Analysis...",
    href: "#",
    srcImg: "/images/germinal.png",
  },
];

export default function page() {
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
      <Footer />
    </>
  );
}
