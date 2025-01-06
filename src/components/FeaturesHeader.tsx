export default function FeaturesHeader() {
  return (
    <header className="w-full bg-color-primary text-white py-3 sticky top-0 z-10">
      <div className="container mx-auto flex justify-center gap-10 items-center px-4">
        {/* Texto del header */}
        <p className="text-xl font-bold">New Features on GENOMAS</p>

        <button className="px-4 py-2 bg-color-secondary text-white font-semibold rounded-md shadow-md hover:outline-dotted ">
          Learn More
        </button>
      </div>
    </header>
  );
}
