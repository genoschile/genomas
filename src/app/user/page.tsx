import CardAnalysis from "@/components/CardAnalysis";
import HeaderInfoUser from "@/components/HeaderInfoUser";

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
      <HeaderInfoUser />

      <div className="px-8 container flex flex-col items-center mt-4">
        <figure>
          <img src="/images/genomas.png" alt="" />
        </figure>

        <main className="flex flex-col gap-10 mt-10">
          {infoCard.map(({ title, description, href }, index) => {
            return (
              <CardAnalysis
                title={title}
                description={description}
                redirect={href}
                key={index}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}
