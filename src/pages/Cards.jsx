import { useContext } from "react";
import { Cartcontext } from "../Context/CardList";
import { DeleteOutlined } from "@ant-design/icons";

export default function Cards() {
  const context = useContext(Cartcontext);

  const getAllSum = () => {
    let sum = 0;
    context.card.forEach((element) => {
      sum += element?.count * element?.price;
    });
    return Number(sum).toFixed(2);
  };

  if (context?.card?.length === 0) {
    return <p className="text-2xl text-center">{"Savatcha bush"}</p>;
  }

  return (
    <div className="container mx-auto mt-5 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-y-2">
          {context?.card?.map((product, index) => {
            return (
              <div
                key={product?.id}
                className="grid grid-cols-1 sm:grid-cols-3 bg-[#f5f5f5] rounded-2xl shadow-2xl gap-6 p-4 transform transition hover:shadow-xl hover:scale-105"
              >
                <div className="flex justify-center">
                  <img
                    className="rounded-2xl shadow-2xl w-full max-w-[150px] sm:max-w-none"
                    src={product.thumbnail}
                    alt={product.name}
                  />
                </div>
                <div className="sm:col-span-2">
                  <p className="text-lg font-semibold">{product.title}</p>
                  <div className="flex items-center gap-2 my-2">
                    <button
                      className="border border-gray-300 rounded-lg py-1 px-3 active:bg-gray-400"
                      onClick={() => {
                        context.decr(index);
                      }}
                    >
                      -
                    </button>
                    <span className="text-lg">{product?.count}</span>
                    <button
                      className="border border-gray-300 rounded-lg py-1 px-3 active:bg-gray-400"
                      onClick={() => {
                        context.incr(index);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Kategoriya: {product?.category}
                  </p>
                  <p className="text-sm text-gray-600">
                    Narxi: {product?.price}$
                  </p>
                  <button
                    className="border border-red-300 bg-red-500 hover:bg-red-400 rounded-lg py-1 px-3 my-3 active:bg-red-400 text-white"
                    onClick={() => {
                      context.delet(index);
                    }}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="container mx-auto md:w-1/2 lg:w-1/4 bg-[#f5f5f5] rounded-lg p-4 my-5 shadow-lg transform transition hover:shadow-xl hover:scale-105 text-lg font-semibold">
        Umumiy Summa: {getAllSum()}$
      </p>
    </div>
  );
}
