import CardAnalysis from "@/components/cards/CardAnalysis";
import { HeaderUserWorkspace } from "@/components/headers/HeaderUserWorkspace";
import "./page.css";
import Footer from "@/components/footer/FooterLanding";

const infoCard = [
  {
    title: "Cancer Variants Analysis",
    description: "OncoKB-powered annotation and AI-driven insights",
    href: "#",
  },
  {
    title: "Germline Variants Analysis",
    description: "Pharmacogenomics and AI-driven insights",
    href: "#",
  },
];

export default function page() {
  return (
    <>
      <div className="container--genomas">
        <HeaderUserWorkspace />

        <main className="container--genomas__main">
          <figure>
            <img src="/images/genomas.png" alt="" />
          </figure>

          <ul>
            {infoCard.map(({ title, description, href }, index) => {
              return (
                <li key={index}>
                  <CardAnalysis
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
