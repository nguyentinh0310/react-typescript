import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Cart } from 'models';

export interface CartState {
  showMiniCart: boolean;
  cartItems: Cart[];
}

const initialState: CartState = {
  showMiniCart: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true;
    },
    hideMiniCart(state) {
      state.showMiniCart = false;
    },
    addToCart(state, action: PayloadAction<Cart>) {
      const newItem: Cart = action.payload;
      const index: any = state.cartItems.findIndex((x) => x.id === newItem.id);
      if (index >= 0) {
        // update to cart
        state.cartItems[index].quantity += newItem.quantity;
      } else {
        // add to cart
        state.cartItems.push(newItem);
      }
    },
    setQuantity(state, action: PayloadAction<Cart>) {
      const { id, quantity }: any = action.payload;
      const index: any = state.cartItems.findIndex((x) => x.id === id);
      if (index >= 0) {
        // update to cart
        state.cartItems[index].quantity += quantity;
      }
    },
    removeFromCart(state, action: PayloadAction<Cart>) {
      const idCart: any = action.payload;
      state.cartItems = state.cartItems.filter((x) => x.id !== idCart);
    },
  },
});

// Actions
export const cartActions = cartSlice.actions;
// Selector
const selectCartItem = (state: RootState) => state.cart.cartItems


// Reducer
const cartReducer = cartSlice.reducer;
export default cartReducer;
