import { FaReact, FaNodeJs, FaGithub } from "react-icons/fa";

const Card = ({
    name, 
    title,
    image
}: {
    name: string,
    title: string,
    image: string
}) => {
  return (
    <div className="w-[397px] h-[227px] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition duration-300 ease-in-out">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="text-left">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{title}</p>
        </div>

        <img
          src={image}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover bg-amber-400"
        />
      </div>

      <div className="flex justify-around items-center px-4 py-2 mt-auto bg-gray-50">
        <FaReact className="text-blue-500 text-2xl" />
        <FaNodeJs className="text-green-500 text-2xl" />
        <FaGithub className="text-black text-2xl" />
      </div>
    </div>
  );
};

export default Card;
