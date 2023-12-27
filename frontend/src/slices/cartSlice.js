import { createSlice } from "@reduxjs/toolkit";
import { updateState } from "../utils/cartUtils";

// Retrieve the cart from localStorage or use an empty cart if not present
const cartFromLocalStorage = localStorage.getItem('cart');
const initialState = cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : { cartItems: [] }

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
    }
  }
});

// Export the action creator and the reducer
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
