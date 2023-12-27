// Helper function to add decimals to a number and format it to two decimal places
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateState = (state) => {
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

    return(state);
}