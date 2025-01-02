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

      <section className="container mx-auto h-screen flex items-center px-4">
        {/* Contenido Izquierdo */}
        <div className="flex-1 text-left space-y-6">
          <h2 className="text-4xl font-bold text-gray-800 leading-tight">
            Turn Your Genomic Data Into Actionable Insights
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            Stop spending hours interpreting complex genetic files. With
            GENOMAS, gain reliable, data-driven answers using advanced AI
            tailored for genomic analysis. Through GENOMAS, you can interact
            with your own digital expert to uncover accurate, trustworthy
            insights instantly. GENOMAS is built on cutting-edge methodologies
            you can depend on.
          </p>
          <button className="px-6 py-3 bg-color-primary text-white font-semibold rounded-lg shadow-md hover:bg-color-primary-dark">
            See more
          </button>
        </div>

        {/* Imagen Derecha */}
        <div className="flex-1 flex justify-center">
          <img
            src="/images/reportfile.png"
            alt="Genomic Report"
            className="w-full max-w-md object-cover"
          />
        </div>
      </section>

      <section className="container mx-auto h-screen flex items-center px-4 bg-purple-600">
        {/* Imagen Izquierda */}
        <div className="flex-1 flex justify-center">
          <img
            src="/images/reportfile.png"
            alt="Genomic Report"
            className="w-full max-w-md object-cover"
          />
        </div>

        {/* Contenido Derecho */}
        <div className="flex-1 text-left space-y-6 text-white">
          <h2 className="text-4xl font-bold leading-tight">
            Turn Your Genomic Data Into Actionable Insights
          </h2>
          <p className="text-lg leading-relaxed max-w-lg">
            Stop spending hours interpreting complex genetic files. With
            GENOMAS, gain reliable, data-driven answers using advanced AI
            tailored for genomic analysis. Through GENOMAS, you can interact
            with your own digital expert to uncover accurate, trustworthy
            insights instantly. GENOMAS is built on cutting-edge methodologies
            you can depend on.
          </p>
          <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-gray-100">
            See more
          </button>
        </div>
      </section>

      <section className="container mx-auto h-screen px-4 flex flex-col items-center justify-center space-y-8 text-center">
        {/* Título */}
        <h2 className="text-4xl font-bold text-gray-800 leading-tight">
          Meet the Team Behind GENOMAS
        </h2>

        {/* Descripción */}
        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
          Our interdisciplinary team of bioinformaticians, clinical physicians,
          engineers, and researchers brings diverse expertise and insights.
          Together, we deliver innovative solutions informed by experience and
          tailored to address complex challenges in healthcare and genomics.
        </p>

        {/* Carrusel de cartas */}
        <div className="w-full max-w-6xl overflow-hidden">
          <div className="flex gap-4 snap-x snap-mandatory overflow-x-auto scrollbar-hide">
            {/* Carta 1 */}
            <div className="min-w-[300px] max-w-[300px] bg-white shadow-lg rounded-lg p-6 snap-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Dr. Jane Smith
              </h3>
              <p className="text-gray-600">Lead Bioinformatician</p>
            </div>

            {/* Carta 2 */}
            <div className="min-w-[300px] max-w-[300px] bg-white shadow-lg rounded-lg p-6 snap-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Dr. John Doe
              </h3>
              <p className="text-gray-600">Clinical Physician</p>
            </div>

            {/* Carta 3 */}
            <div className="min-w-[300px] max-w-[300px] bg-white shadow-lg rounded-lg p-6 snap-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Dr. Alice Johnson
              </h3>
              <p className="text-gray-600">AI Researcher</p>
            </div>

            {/* Carta 4 */}
            <div className="min-w-[300px] max-w-[300px] bg-white shadow-lg rounded-lg p-6 snap-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Dr. Robert Brown
              </h3>
              <p className="text-gray-600">Genomics Engineer</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
