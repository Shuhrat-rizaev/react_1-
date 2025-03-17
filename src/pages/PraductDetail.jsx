import { useState, useEffect } from "react";
import axios from "axios";
import { Heart, ShoppingCart } from "lucide-react";

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState("blue");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const colors = ["blue", "yellow", "black", "white"];

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");

        if (Array.isArray(res.data?.products)) {
          setProducts(res.data.products);
        } else {
          console.error("Mahsulotlar topilmadi!");
        }
      } catch (error) {
        console.error("Xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      {/* Mahsulotlar bo‘limi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.slice(0, 1).map((data) => (
          <div key={data.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={
                  data.thumbnail ||
                  data.images?.[0] ||
                  "https://via.placeholder.com/300"
                }
                alt={data.title || "No Image"}
                className="w-full rounded-lg"
              />

              {/* Kichik rasmlar */}
              <div className="flex space-x-2 mt-4">
                {data.images?.slice(0, 4).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={data.title}
                    className="w-16 h-16 border rounded-lg cursor-pointer"
                  />
                ))}
              </div>
            </div>

            {/* Mahsulot detallari */}
            <div>
              <h2 className="text-xl font-bold">{data.title}</h2>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-gray-600">1000 лайков</span>
                <Heart size={24} className="text-red-500" />
                <ShoppingCart size={24} className="mr-2" />
              </div>

              {/* Ranglar tanlash */}
              <div className="mt-4">
                <p className="text-gray-700">Цвет:</p>
                <div className="flex space-x-2 mt-1">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`w-6 h-6 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    ></button>
                  ))}
                </div>
              </div>

              <p className="mt-4 font-semibold text-lg">{data.price} СУМ</p>
              <button className="mt-4 bg-black text-white py-2 px-4 rounded-lg flex items-center">
                <ShoppingCart size={24} className="mr-2" /> Добавить в корзину
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tavsiya etilgan mahsulotlar */}
      <div className="mt-10">
        <h3 className="text-lg font-bold mb-4">ИНТЕРЕСНЫЕ ПРЕДЛОЖЕНИЯ</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(1, 5).map((product) => (
            <div key={product.id} className="border p-2 rounded-lg">
              <img
                src={product.thumbnail || "https://via.placeholder.com/150"}
                alt={product.title}
                className="w-full rounded-lg"
              />
              <p className="mt-2 text-sm">{product.title}</p>
              <p className="font-semibold">{product.price} СУМ</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reklama banner */}
      <div className="mt-10 relative">
        <img
          src="https://avatars.mds.yandex.net/i?id=69428d505b6ca4091e84e60b250231b756a4ee75-3788438-images-thumbs&n=13"
          alt="Sale Banner"
          className="w-full rounded-lg"
        />
        <div className="absolute bottom-4 left-4 bg-black text-white py-2 px-4 rounded-lg">
          # МОЖНО ДОБАВИТЬ РЕКЛАМУ
        </div>
      </div>
    </div>
  );
}
