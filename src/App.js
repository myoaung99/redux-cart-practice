import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/ui-slice";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisiable);

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  // cart အပြောင်းအလဲ ဖြစ်တာနဲ့
  // ပြောင်းတာ ဘာလို့သိလဲဆို useSelector က redux store ကို auto subscription လုပ်ပေးလို့
  const cart = useSelector((state) => state.cart);

  // useEffect ထဲက ကောင်တွေ အလုပ်လုပ်မယ်
  useEffect(() => {
    const sendHTTP = async () => {
      // pending state
      dispatch(
        uiActions.showNotification({
          status: "pending...",
          title: "Sending...",
          message: "Sending cart items....",
        })
      );
      const response = await fetch(
        "https://react-5826f-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      // error state
      if (!response.ok) {
        throw new Error("Error");
      }

      // success state
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart items successfullu!",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendHTTP().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart items failed!",
        })
      );
    });
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
