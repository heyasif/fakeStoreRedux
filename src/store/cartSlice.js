import { createSlice, current } from "@reduxjs/toolkit";

const getInitialCart = () => {
    try {
        const storedCart = localStorage.getItem("cart");
        if (storedCart === null) {
            return [];
        }
        const parsedCart = JSON.parse(storedCart);
        if (!Array.isArray(parsedCart)) {
            throw new Error('Cart data is not an array');
        }
        return parsedCart;
    } catch (error) {
        console.error('Error reading the cart from localStorage:', error);
        return []; 
    }
};

const initialState = getInitialCart();

// Function to safely save the cart to localStorage
const saveCartToLocalStorage = (cart) => {
    try {
        const serializedCart = JSON.stringify(cart);
        localStorage.setItem("cart", serializedCart);
    } catch (error) {
        console.error('Failed to save cart:', error);
    }
};

const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingIndex = state.findIndex(item => item.id === action.payload.id);
            if (existingIndex !== -1) {
                state[existingIndex].quantity += 1; // Increment quantity
            } else {
                const newItem = { ...action.payload, quantity: 1 }; // Add new item with quantity
                state.push(newItem);
            }
            saveCartToLocalStorage(current(state));
        },
        removeFromCart: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        increment: (state, action) => {
            const existingIndex = state.findIndex(item => item.id === action.payload);
            if (existingIndex !== -1) {
                state[existingIndex].quantity += 1;
            }
            saveCartToLocalStorage(current(state));
        },
        decrement: (state, action) => {
            const existingIndex = state.findIndex(item => item.id === action.payload);
            if (existingIndex !== -1) {
                if (state[existingIndex].quantity > 1) {
                    state[existingIndex].quantity -= 1;
                } else {
                    state.splice(existingIndex, 1); // Remove item if quantity reaches 0
                }
            }
            saveCartToLocalStorage(current(state));
        }
    }
});

export const { addToCart, removeFromCart, increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;

