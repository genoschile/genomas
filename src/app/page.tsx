import Carrousel from "@/components/Carrousel";
import HeaderLanding from "@/components/HeaderLanding";
import TeamCarrousel from "@/components/TeamCarrousel";

export default function Home() {
  return (
    <>
      <HeaderLanding />

      <section className="container mx-auto h-auto md:h-screen flex items-center">
        <div className="w-full px-8 py-6 flex flex-col justify-between">
          {/* Contenedor principal */}
          <div className="flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Título */}
            <h2 className="text-4xl font-bold leading-tight text-gray-800 md:w-1/2">
              Genomics, Bioinformatics, AI
              <br />
              Shaping the future of health
            </h2>

            {/* Descripción */}
            <p className="text-lg text-gray-600 leading-relaxed md:w-1/2">
              Genomas is an AI-powered platform for decoding genetic data. It
              offers functional variant annotations, diagnostic insights,
              treatment options, and an interactive chat to explore automated
              reports with ease.
            </p>
          </div>

          <Carrousel />
        </div>
      </section>

      <section className="container mx-auto md:h-screen bg-color-primary flex flex-col justify-between p-16 items-center text-center space-y-8 px-4 ">
        {/* Título */}
        <h2 className="text-4xl font-bold text-white leading-tight">
          Discover How GENOMAS Can Empower You
        </h2>

        {/* Párrafo */}
        <p className="text-lg text-white leading-relaxed max-w-3xl">
          GENOMAS offers a centralized platform for all your genomic data,
          ensuring your analyses are always synchronized, accessible, and
          secure.
        </p>

        {/* Botones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full p-8">
          <button className="px-4 py-2 bg-white text-color-skyBlue font-semibold rounded-lg shadow-md hover:bg-gray-200 text-2xl">
            Cancer Variants Analysis
          </button>
          <button className="px-4 py-2 bg-white text-color-skyBlue font-semibold rounded-lg shadow-md hover:bg-gray-200 text-2xl">
            Germline Variants Analysis
          </button>
          <button className="px-4 py-2 bg-white text-color-skyBlue font-semibold rounded-lg shadow-md hover:bg-gray-200 text-2xl">
            Bla Variants Analysis
          </button>
        </div>
      </section>

      <section className="container mx-auto px-8 py-8 md:h-screen flex flex-col items-center md:flex-row">
        {/* Contenido Izquierdo */}
        <div className="flex-1 text-left space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            Turn Your Genomic Data Into Actionable Insights
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-lg">
            Stop spending hours interpreting complex genetic files. With
            GENOMAS, gain reliable, data-driven answers using advanced AI
            tailored for genomic analysis. Through GENOMAS, you can interact
            with your own digital expert to uncover accurate, trustworthy
            insights instantly. GENOMAS is built on cutting-edge methodologies
            you can depend on.
          </p>
          {/* Botón para pantallas medianas y grandes */}
          <div className="hidden md:block">
            <button className="px-6 py-3 bg-color-primary text-white font-semibold rounded-lg shadow-md hover:bg-color-primary-dark">
              See more
            </button>
          </div>
        </div>

        {/* Imagen Derecha */}
        <div className="flex-1 flex flex-col items-center mt-8 md:mt-0">
          <img
            src="/images/reportfile.png"
            alt="Genomic Report"
            className="w-full max-w-xs md:max-w-md object-cover"
          />
          {/* Botón para pantallas pequeñas */}
          <div className="mt-6 md:hidden">
            <button className="px-6 py-3 bg-color-primary text-white font-semibold rounded-lg shadow-md hover:bg-color-primary-dark">
              See more
            </button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 md:h-screen flex flex-col md:flex-row items-center bg-purple-600">
        {/* Imagen (en pantallas grandes estará a la izquierda) */}
        <div className="flex-1 flex flex-col items-center mt-8 md:mt-0 order-2 md:order-1">
          <img
            src="/images/reportfile.png"
            alt="Genomic Report"
            className="w-full max-w-xs md:max-w-md object-cover"
          />
          {/* Botón visible solo en pantallas pequeñas */}
          <div className="mt-6 md:hidden">
            <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-gray-100">
              See more
            </button>
          </div>
        </div>

        {/* Contenido (Texto + Botón) */}
        <div className="flex-1 text-left space-y-6 text-white mt-8 md:mt-0 order-1 md:order-2">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Turn Your Genomic Data Into Actionable Insights
          </h2>
          <p className="text-base md:text-lg leading-relaxed max-w-lg">
            Stop spending hours interpreting complex genetic files. With
            GENOMAS, gain reliable, data-driven answers using advanced AI
            tailored for genomic analysis. Through GENOMAS, you can interact
            with your own digital expert to uncover accurate, trustworthy
            insights instantly. GENOMAS is built on cutting-edge methodologies
            you can depend on.
          </p>
          {/* Botón visible solo en pantallas grandes */}
          <div className="hidden md:block">
            <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-gray-100">
              See more
            </button>
          </div>
        </div>
      </section>

      <TeamCarrousel />
    </>
  );
}
