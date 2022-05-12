import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // item info တွေကို obj အဖြစ်နဲ့ လက်ခံပါမယ်
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;

      state.changed = true;

      // action payload ကနေဝင်လာတဲ့ item id ဟာ state ထဲက item id နဲ့ တူနေလား? တနည်း ရှိနေလား စစ်တာပါ
      const existingItem = state.items.find((item) => item.id === newItem.id);

      // if မရှိဘူးဆိုရင် obj တစ်ခုကို push လိုက်ပါ
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price * 1,
        });
      } else {
        // ရှိပြီးသား item ရဲ့ အရေအတွက်ကို တစ်ပေါင်း
        // ရှိပြီးသား item ရဲ့ စုစုပေါင်းငွေကို ဝင်လာတဲ့ item ရဲ့ စျေးနှုန်းနဲ့ ပေါင်း
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }

      state.totalQuantity = state.items.reduce((curNum, item) => {
        return item.quantity + curNum;
      }, 0);
    },
    removeItemFromCart(state, action) {
      const id = action.payload;

      state.changed = true;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem.quantity === 1) {
        // quantity က တခုတည်းဆို array ထဲက ထုတ်
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }

      state.totalQuantity = state.items.reduce((curNum, item) => {
        return item.quantity + curNum;
      }, 0);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
