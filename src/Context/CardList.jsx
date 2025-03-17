import { createContext, useState } from "react";

export const Cartcontext = createContext();

const CardListProvider = ({ children }) => {
  const [card, SetCard] = useState([]);
  const pushCard = (obj) => {
    console.log(obj);
    if (card.length == 0) {
      let current = [...card];
      current.push({ ...obj, count: 1 });
      SetCard(current);
    } else {
      let current = [...card];
      let finded = current.find((product) => {
        return product?.id == obj?.id;
      });
      if (!finded) {
        current.push({ ...obj, count: 1 });
        SetCard(current);
      } else {
        alert("Bu maxsulot savatchada mavjud");
      }
    }
  };
  const incr = (obj) => {
    console.log("incr", obj);
    let current = [...card];
    if (current[obj].stock !== current[obj].count) {
      current[obj].count += 1;
    } else {
      alert("Maxsulot tugadi");
    }
    SetCard(current);
  };
  const decr = (obj) => {
    let current = [...card];
    if (current[obj].count !== 0) {
      current[obj].count -= 1;
    } else {
      current.splice(obj, 1);
    }

    SetCard(current);
  };
  const delet = (id) => {
    let current = [...card];
    current.splice(id, 1);
    SetCard(current);
  };
  return (
    <Cartcontext.Provider
      value={{ card, SetCard, pushCard, incr, decr, delet }}
    >
      {children}
    </Cartcontext.Provider>
  );
};

export default CardListProvider;
