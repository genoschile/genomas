import Carrousel from "@/components/Carrousel";
import HeaderLanding from "@/components/HeaderLanding";

export default function Home() {
  return (
    <>
      <HeaderLanding />

      <section className="container mx-auto h-screen ">
        <div className="flex flex-row justify-between items-start flex-1 space-y-6">
          <h2 className="text-4xl font-bold leading-tight text-gray-800 p-10">
            Genomics, Bioinformatics, AI
            <br />
            Shaping the future of health
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl p-10">
            Genomas is an AI-powered platform for decoding genetic data. It
            offers functional variant annotations, diagnostic insights,
            treatment options, and an interactive chat to explore automated
            reports with ease.
          </p>
        </div>

        <Carrousel />
      </section>
      <section className="container mx-auto h-screen bg-color-primary flex flex-col justify-between p-16 items-center text-center space-y-8 px-4">
        {/* Título */}
        <h2 className="text-4xl font-bold text-white leading-tight">
          Discover How GENOMAS Can Empower You
        </h2>

        {/* Párrafo */}
        <p className="text-lg text-gray-200 leading-relaxed max-w-3xl">
          GENOMAS offers a centralized platform for all your genomic data,
          ensuring your analyses are always synchronized, accessible, and
          secure.
        </p>

        {/* Botones */}
        <div className="flex justify-between w-full max-w-2xl">
          <button className="px-4 py-2 bg-white text-color-primary font-semibold rounded-lg shadow-md hover:bg-gray-200">
            Cancer Variants Analysis
          </button>
          <button className="px-4 py-2 bg-white text-color-primary font-semibold rounded-lg shadow-md hover:bg-gray-200">
            Germline Variants Analysis
          </button>
          <button className="px-4 py-2 bg-white text-color-primary font-semibold rounded-lg shadow-md hover:bg-gray-200">
            Bla Variants Analysis
          </button>
        </div>
      </section>

      <section>

      </section>


      <section>

      </section>
    </>
  );
}
