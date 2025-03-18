import { useContext, useState } from "react";
import { Search, User, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { Cartcontext } from "../Context/CardList";

export default function Navbar() {
  const { card } = useContext(Cartcontext);
  const [language, setLanguage] = useState("O‘zbekcha");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === "O‘zbekcha" ? "Русский" : "O‘zbekcha");
  };

  return (
    <nav className="bg-black text-white py-5 px-5 md:px-10 flex items-center justify-between relative">
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
      <ul
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex md:space-x-6 text-sm absolute md:relative top-16 md:top-auto left-0 w-full md:w-auto bg-black md:bg-transparent flex-col md:flex-row items-center`}
      >
        <Link className="hover:underline cursor-pointer py-2 md:py-0" to={`/`}>
          Bosh sahifa
        </Link>
        <Link
          className="hover:underline cursor-pointer py-2 md:py-0"
          to={`/products/category-list`}
        >
          Categoreis
        </Link>
        <li className="hover:underline cursor-pointer py-2 md:py-0">
          Электроника
        </li>
        <li className="hover:underline cursor-pointer py-2 md:py-0">Бренды</li>
        <li className="hover:underline cursor-pointer py-2 md:py-0">Обувь</li>
        <li className="hover:underline cursor-pointer py-2 md:py-0">Хоз.</li>
        <li className="hover:underline cursor-pointer py-2 md:py-0">Авто</li>
      </ul>
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Поиск товаров"
            className="bg-gray-800 text-white text-sm px-3 py-1 rounded-md focus:outline-none focus:ring"
          />
          <Search
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>
        <User className="cursor-pointer" size={20} />
        <Heart className="cursor-pointer" size={20} />
        <Link to={`/cards`} className="flex items-center relative">
          <FaCartShopping size={20} />
          {card.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {card.length}
            </span>
          )}
        </Link>
        <div className="relative">
          <button
            onClick={toggleLanguage}
            className="bg-gray-800 text-white text-sm px-3 py-1 rounded-md"
          >
            {language}
          </button>
        </div>
      </div>
    </nav>
  );
}
