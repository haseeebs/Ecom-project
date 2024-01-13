import { createSlice } from "@reduxjs/toolkit";
import { updateState } from "../utils/cartUtils";

// Retrieve the cart from localStorage or use an empty cart if not present
const cartFromLocalStorage = localStorage.getItem('cart');
const initialState = cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : { cartItems: [], shippingAddress: {}, paymentMethod: 'Paypal' }

// Define the cart slice using createSlice from Redux Toolkit
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Extract the new item from the action payload
      const newItem = action.payload;

      // Check if the item already exists in the cart
      const existItem = state.cartItems.find(item => item._id === newItem._id);

      // Update the cart based on whether the item already exists or not
      if (existItem) {
        state.cartItems = state.cartItems.map(item => item._id === existItem._id ? newItem : item);
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }

      updateState(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload);

      return updateState(state)
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateState(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateState(state)
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateState(state);
    }
  }
});

// Export the action creator and the reducer
export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
