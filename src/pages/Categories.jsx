import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiClint } from "../utilis/apiservise";
import { categoires_url, product_url } from "../utilis/urls";
const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([null]);
  const [category, setCategory] = useState([]);

  const getProducts = async () => {
    let res = await apiClint({
      url:
        category == null ? product_url : product_url + `/category/${category}`,
    });
    if (res?.status == 200) {
      setData(res.data.products);
      console.log(res.data.products);
      setLoading(false);
    }
  };
  const getCategories = async () => {
    let res = await apiClint({
      url: categoires_url,
      method: "GET",
    });
    if (res?.status == 200) {
      setCategories(res?.data);
    }
  };
  useEffect(() => {
    getProducts();
  }, [category]),
    useEffect(() => {
      getCategories();
    }, []);

  return (
    <div className=" grid grid-cols-4 gap-2 container w-auto">
      <div className="container mx-auto p-5 col-span-3">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Mahsulotlar
        </h1>
        {!!loading ? (
          <div className="flex justify-center items-center h-32">
            <svg
              className="animate-spin h-10 w-10 text-blue-500"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((item) => (
              <div
                key={item.id}
                className="border p-3 rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 transform transition hover:shadow-xl hover:scale-105"
              >
                {item.thumbnail && (
                  <img
                    className="w-[250px] h-[200px] object-cover rounded-t-lg"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                )}
                <div className="p-1">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {item.title.length > 15
                      ? `${item.title.slice(0, 15)}...`
                      : item.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {item.description.length > 50
                      ? `${item.description.slice(0, 50)}...`
                      : item.description}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-lg font-semibold text-blue-500">
                      ${item.price}
                    </p>
                    <Link
                      to={`/product-detail/${item.id}`}
                      className="text-sm text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Batafsil
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className=" col-span-1 container w-auto p-3">
        <ul>
          <li
            onClick={() => {
              setCategory(null);
            }}
            className={`py-2 px-4 border rounded-lg mt-2 ${
              category == null ? "bg-amber-400" : ""
            }`}
          >
            Barchasi
          </li>
          {categories?.map((res) => {
            return (
              <li
                key={res}
                className={`py-2 px-4 border rounded-lg mt-2 ${
                  category == res ? "bg-amber-400" : ""
                }`}
                onClick={() => {
                  console.log(res);
                  setCategory(res);
                }}
              >
                {res}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Products;
