export default function FeaturesHeader() {
  return (
    <header className="w-full bg-color-primary text-white py-3 sticky top-0 z-10">
      <div className="container mx-auto flex justify-center gap-10 items-center px-4">
        {/* Texto del header */}
        <p className="text-sm font-medium">New Features on GENOMAS</p>

        {/* Botón de Learn More */}
        <button className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-gray-100">
          Learn More
        </button>
      </div>
    </header>
  );
}
