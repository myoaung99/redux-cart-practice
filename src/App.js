import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisiable);
  // cart အပြောင်းအလဲ ဖြစ်တာနဲ့
  // ပြောင်းတာ ဘာလို့သိလဲဆို useSelector က redux store ကို auto subscription လုပ်ပေးလို့
  const cart = useSelector((state) => state.cart);

  // useEffect ထဲက ကောင်တွေ အလုပ်လုပ်မယ်
  useEffect(() => {
    if (cart.items.length > 0) {
      fetch("https://react-5826f-default-rtdb.firebaseio.com/cart.json", {
        method: "PUT",
        body: JSON.stringify(cart),
      });
    }
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
