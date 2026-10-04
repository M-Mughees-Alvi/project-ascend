import "./App.css";
import { Navbar } from "./components/Navbar";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import { CartProvider } from "./Provider/CartProvider";
function App() {
  return (
    <>
      <CartProvider>
        <Navbar />
        <ProductList />
        <Cart />
      </CartProvider>
    </>
  );
}

export default App;
