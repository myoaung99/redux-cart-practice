import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-actions";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisiable);

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  // cart အပြောင်းအလဲ ဖြစ်တာနဲ့
  // ပြောင်းတာ ဘာလို့သိလဲဆို useSelector က redux store ကို auto subscription လုပ်ပေးလို့
  const cart = useSelector((state) => state.cart);

  // side effect code တွေကို redux နဲ့ တွဲသုံးတာပါ
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // useEffect ထဲက ကောင်တွေ အလုပ်လုပ်မယ်
  useEffect(() => {
    if (cart.changed) {
      // dispatch action from redux
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
