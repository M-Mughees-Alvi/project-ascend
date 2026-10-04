import { useCart } from "../Context/CartContext";

export function Navbar() {
  const { state } = useCart();

  return (
    <nav className="navbar">
      <h1 className="logo">MY STORE</h1>
      <div className="cart-status">
        MY Cart: <strong>{state.totalItems}</strong> items
      </div>
    </nav>
  );
}
