import { useContext, useState } from "react";
import { Search, User, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { Cartcontext } from "../Context/CardList";
export default function Navbar() {
  const { card } = useContext(Cartcontext);
  console.log(card);
  const [language, setLanguage] = useState("O‘zbekcha");
  const toggleLanguage = () => {
    setLanguage(language === "O‘zbekcha" ? "Русский" : "O‘zbekcha");
  };

  return (
    <nav className="bg-black text-white py-5 px-10 flex items-center justify-between">
      <ul className="flex space-x-6 text-sm">
        {/* <li className="hover:underline cursor-pointer">Сувениры</li> */}
        <Link className="hover:underline cursor-pointer" to={`/`}>
          {" "}
          Bosh sahifa
        </Link>
        <Link
          className="hover:underline cursor-pointer"
          to={`/products/category-list`}
        >
          {" "}
          Categoreis
        </Link>
        <li className="hover:underline cursor-pointer">Электроника</li>
        <li className="hover:underline cursor-pointer">Бренды</li>
        <li className="hover:underline cursor-pointer">Обувь</li>
        <li className="hover:underline cursor-pointer">Хоз. </li>
        <li className="hover:underline cursor-pointer">Авто </li>
      </ul>
      <div className="flex items-center space-x-4">
        <div className="relative">
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
        {/* <ShoppingCart className="cursor-pointer" size={20} /> */}
        <Link to={`/cards`} className="flex justify-between">
          <FaCartShopping />
          <sup>{card.length}</sup>
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
