import { useContext } from "react";
import { Cartcontext } from "../Context/CardList";
import { DeleteOutlined } from "@ant-design/icons";

export default function Cards() {
  const context = useContext(Cartcontext);
  // console.log(context);
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
    <div className="container mx-auto mt-5">
      <div className="grid grid-cols-3 ">
        <div className="flex flex-col gap-y-2 px-4">
          {context?.card?.map((product, index) => {
            return (
              <div
                key={product?.id}
                className="grid grid-cols-3 bg-[#f5f5f5] rounded-2xl shadow-2xl gap-6  transform transition hover:shadow-xl hover:scale-105"
              >
                <div className="col-span-1">
                  <img
                    className="rounded-2xl shadow-2xl flex flex-col items-center mt-5 mx-3"
                    src={product.thumbnail}
                    alt={product.name}
                  />
                </div>
                <div className="col-span-2 ">
                  <p>{product.title}</p>
                  <div className="flex items-center gap-2">
                    <button
                      className="border border-gray-300 rounded-lg py-1 px-3 active:bg-gray-400"
                      onClick={() => {
                        context.decr(index);
                      }}
                    >
                      -
                    </button>
                    <span>{product?.count}</span>
                    <button
                      className="border border-gray-300 rounded-lg py-1 px-3 active:bg-gray-400"
                      onClick={() => {
                        context.incr(index);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p>Kategoriya:{product?.category}</p>
                  <p>Narxi:{product?.price}$</p>
                  <button
                    className="border border-red-300 bg-red-500 hover:bg-red-400 rounded-lg py-1 px-3 mx-50 my-3 active:bg-red-400 "
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
        {/* <div>Buyurma uchun malumotlar</div> */}
      </div>
      <p className="container mx-5 border w-[17%] bg-[#f5f5f5] rounded-lg  p-2 px-3 my-5 overflow-hidden shadow-lg transform transition hover:shadow-xl hover:scale-105">
        Umumiy Summa:{getAllSum()}
      </p>
    </div>
  );
}
