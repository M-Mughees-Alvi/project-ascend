import { useCart } from "../Context/CartContext";

export function Cart() {
  const { state, dispatch } = useCart();

  return (
    <section className="section cart-section">
      <h2 className="section-title">Your Cart</h2>
      <div className="cart-summary">
        <span>
          Total Items: <strong>{state.totalItems}</strong>
        </span>
        <span>
          Total Price:{" "}
          <strong className="aqua-text">${state.totalPrice}</strong>
        </span>
      </div>

      {state.items.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {state.items.map((i) => (
            <div key={i.id} className="cart-row">
              <span className="item-name">
                {i.name} × {i.quantity} (${i.price * i.quantity})
              </span>
              <div className="btn-group">
                <button
                  className="btn btn-sm"
                  onClick={() =>
                    dispatch({ type: "DECREASE_QUANTITY", payload: i })
                  }
                >
                  -
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() =>
                    dispatch({ type: "INCREASE_QUANTITY", payload: i })
                  }
                >
                  +
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => dispatch({ type: "REMOVE_ITEM", payload: i })}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            className="btn btn-outline clear-btn"
            onClick={() => dispatch({ type: "CLEAR_CART" })}
          >
            Clear Cart
          </button>
        </div>
      )}
    </section>
  );
}
