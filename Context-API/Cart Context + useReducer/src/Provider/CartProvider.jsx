import { useReducer } from "react";
import { CartContext } from "../Context/CartContext";
import { CartReducer } from "../Reducer/CartReducer";
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(CartReducer, {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
