import React, { createContext, useContext, useEffect, useReducer } from "react";

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      let newCartData = [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          img: action.img,
          price: parseInt(action.price),
        },
      ];

      return newCartData;

    case "UPDATE":
      let newArr = [...state];

      newArr = newArr.map((food) => {
        if (food.id === action.id) {
          return {
            ...food,
            qty: parseInt(food.qty) + parseInt(action.qty),
            price: parseInt(food.price) + parseInt(action.price),
          };
        }

        return food;
      });

      return newArr;

    case "REMOVE":
      let newData = [...state];

      newData.splice(action.index, 1);

      return newData;

    case "DROP":
      let dropArr = [];

      return dropArr;

    default:
      return state;
  }
};

export const ContextReducer = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem("cartData"));

  const [state, dispatch] = useReducer(reducer, initialState || []);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(state));
  }, [state]);

  return (
    <>
      <cartDispatchContext.Provider value={dispatch}>
        <cartStateContext.Provider value={state}>
          {children}
        </cartStateContext.Provider>
      </cartDispatchContext.Provider>
    </>
  );
};

export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);
