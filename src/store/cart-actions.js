import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-5826f-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Error");
      }

      const data = await response.json();

      return data;
    };

    try {
      const responseData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          ...responseData,
          items: responseData.items || [],
        })
      );
    } catch (error) {
      console.log(error.message);
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

// custom dispatch actions
export const sendCartData = (cart) => {
  return async (dispatch) => {
    // dispatch notification action with payloads
    dispatch(
      uiActions.showNotification({
        status: "pending...",
        title: "Sending...",
        message: "Sending cart items....",
      })
    );

    // http func
    const sendHTTP = async () => {
      const response = await fetch(
        "https://react-5826f-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      // error state
      if (!response.ok) {
        throw new Error("Error");
      }
    };

    try {
      await sendHTTP();

      // success
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart items successfullu!",
        })
      );
    } catch (error) {
      // error
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart items failed!",
        })
      );
    }
  };
};
