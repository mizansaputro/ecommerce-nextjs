import { createSlice } from '@reduxjs/toolkit'

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    quantity: 0,
    subtotal: 0,
    isAnyNullQty: false
  },
  reducers: {
    addItem: (state, action) => {
      const name = action.payload.name;
      const var1 = action.payload.var1;
      const var2 = action.payload.var2;
      const qty = parseInt(action.payload.qty);
      const price = action.payload.price;
      const finalPrice = action.payload.finalPrice;
      const discount = action.payload.discount;
      const img1 = action.payload.img1;

      let isInCart = false;
      state.cart?.map(item => {
        if (item.name===name && item.var1===var1 && item.var2===var2){
          item.qty += qty;
          isInCart = true;
        }
      })
      if (!isInCart){
        state.cart.push({name: name, var1: var1, var2: var2, qty: qty, price: price, finalPrice: finalPrice, discount: discount, img1})
      }
      state.quantity += qty;
      state.subtotal += finalPrice*qty;
    },
    removeItem: (state, action) => {
      const index = action.payload.index;
      
      state.quantity -= state.cart[index]?.qty;
      state.subtotal -= state.cart[index]?.finalPrice*state.cart[index]?.qty; 
      state.cart?.splice(index,1);
    },
    updateItem: (state, action) => {
      const qty = parseInt(action.payload.qty);
      const index = action.payload.index;

      if (qty<=0){
        removeItem({index})
      }else if(isNaN(qty)){
          state.quantity -= state.cart[index]?.qty;
          state.subtotal -= state.cart[index]?.finalPrice*state.cart[index]?.qty; 
          state.cart[index].qty = '';
        }else{
          state.quantity -= state.cart[index]?.qty;
          state.subtotal -= state.cart[index]?.finalPrice*state.cart[index]?.qty; 
          state.cart[index].qty = qty;
          state.subtotal += state.cart[index]?.finalPrice*state.cart[index]?.qty;
          state.quantity += state.cart[index]?.qty;
        }
    },
    getIsAnyNullQtyinCart: state =>{
      state.cart?.map(item => {
        if (item.qty==''){
          state.isAnyNullQty = true;
        }
      })
    },
    deleteAllItemsInCart: state => {
      state.subtotal = 0;
      state.isAnyNullQty = false;
      state.cart = [];
      state.quantity = 0;
    }
  }
}) 

export const {addItem, removeItem, updateItem, getIsAnyNullQtyinCart, deleteAllItemsInCart} = CartSlice.actions;
export default CartSlice.reducer;