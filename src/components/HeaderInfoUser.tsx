export default function HeaderInfoUser() {
  return (
    <header className="w-full container bg-color-primary text-white py-2 sticky top-0 z-10 flex items-center justify-center px-8">
      <div className="px-4 flex gap-6 items-center">
        <p className="text-lg font-bold hidden sm:block ">
          New Features on GENOMAS
        </p>

        <button className="px-3 py-2 bg-color-secondary text-white text-base font-semibold rounded-md shadow-md hover:outline-dotted ">
          Learn More
        </button>
      </div>

      <div className="px-4 cursor-pointer ml-auto flex gap-6">

        <p className="text-lg font-bold hidden sm:block">
            Bienvenido!
        </p>

        <img src="/images/user.png" alt="" className="h-8 w-8 rounded-full" />
      </div>
    </header>
  );
}
