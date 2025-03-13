export default function Section4() {
  return (
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
          Stop spending hours interpreting complex genetic files. With GENOMAS,
          gain reliable, data-driven answers using advanced AI tailored for
          genomic analysis. Through GENOMAS, you can interact with your own
          digital expert to uncover accurate, trustworthy insights instantly.
          GENOMAS is built on cutting-edge methodologies you can depend on.
        </p>
        {/* Botón visible solo en pantallas grandes */}
        <div className="hidden md:block">
          <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-gray-100">
            See more
          </button>
        </div>
      </div>
    </section>
  );
}
