import { createSlice } from "@reduxjs/toolkit";

// Retrieve the cart from localStorage or use an empty cart if not present
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

// Helper function to add decimals to a number and format it to two decimal places
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
}

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

      // Calculate the total price of items in the cart
      state.itemsPrice = addDecimals(state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0));

      // Determine the shipping price based on the total order price
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // Calculate the tax price (15% tax)
      state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

      // Calculate the total order price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      // Update localStorage with the modified cart state
      localStorage.setItem('cart', JSON.stringify(state));

      // Log the individual components of the order for debugging
      console.log(state.itemsPrice, state.shippingPrice, state.taxPrice, state.totalPrice);
    }
  }
});

// Export the action creator and the reducer
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
