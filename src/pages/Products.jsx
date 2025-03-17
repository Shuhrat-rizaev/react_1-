import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiClint } from "../utilis/apiservise";
import { categoires_url, product_url } from "../utilis/urls";
import { Cartcontext } from "../Context/CardList";
const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPeges] = useState();
  const [skip, setSkip] = useState(1);

  const { pushCard } = useContext(Cartcontext);

  const getProducts = async () => {
    let res = await apiClint({
      url: product_url + `?limit=20&skip=${(skip - 1) * 20}`,
    });

    if (res?.status == 200) {
      setData(res.data.products);
      let currrent_page = [];
      for (let i = 1; i <= Math.ceil(res?.data?.total / 20); i++) {
        currrent_page.push(i);
      }
      setPeges(currrent_page);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [skip]);

  const searchHandl = async (search) => {
    if (search.length > 3) {
      let res = await apiClint({
        method: "GET",
        url: `/products/search?q=${search}`,
      });
      if (res?.status == 200) {
        setData(res?.data?.products);
      }
      console.log(res?.data);
    }
  };

  return (
    <div className="grid grid-cols-3  gap-2 container w-auto">
      <div className="container mx-auto p-5 col-span-3">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Mahsulotlar
        </h1>
        <div className="flex gap-1">
          <input
            onChange={(val) => {
              // setSearch(val.target.value);
              searchHandl(val.target.value);
            }}
            className="border py-1 px-3 my-3 rounded-2xl"
            type="text"
          />
          <button
            onClick={() => {
              searchHandl();
            }}
            className="border py-1 px-3 my-3 rounded-2xl"
          >
            Qidirish
          </button>
        </div>

        {loading ? (
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
                    <button
                      onClick={() => {
                        pushCard(item);
                      }}
                      className="text-sm text-white bg-green-500 px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Savatcha
                    </button>
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
      <div className="flex gap-2 justify-center items-center text-center">
        {/* <p>Pagenetion</p> */}
        {pages?.map((item) => {
          return (
            <button
              className={`border py-1 px-3 my-3 rounded-lg  ${
                skip == item && "bg-amber-500"
              }`}
              key={item}
              onClick={() => {
                setSkip(item);
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
