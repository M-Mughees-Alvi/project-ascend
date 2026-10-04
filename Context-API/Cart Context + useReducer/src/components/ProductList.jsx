import { useCart } from "../Context/CartContext";

const products = [
  { id: 1, name: "Keyboard", price: 50 },
  { id: 2, name: "Mouse", price: 150 },
  { id: 3, name: "Speaker", price: 300 },
  { id: 4, name: "Mic", price: 100 },
];

export function ProductList() {
  const { dispatch } = useCart();

  return (
    <section className="section">
      <h2 className="section-title">Products</h2>
      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <h3>{p.name}</h3>
            <p className="price">${p.price}</p>
            <button
              className="btn btn-aqua"
              onClick={() => dispatch({ type: "ADD_ITEM", payload: p })}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
