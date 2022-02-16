import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      let flag=true;
      state.products.find((obj)=>{
        if(obj._id === action.payload._id){
          obj.quantity+=action.payload.quantity;
          flag=false;
          return true;
        }
        return false;
      })
      if(flag){
        state.products.push(action.payload);
        state.quantity += 1;
      }
      state.total += action.payload.price * action.payload.quantity;
    },
    counterProduct:(state,action)=>{
      if(action.payload.type === 'ADD'){
        state.products.find((obj)=>{
          if(obj._id === action.payload._id){
            obj.quantity+=1;
            return true;
          }
          return false;
        })
        state.total += action.payload.price ;
      }else{
        state.products.find((obj)=>{
          if(obj._id === action.payload._id){
            obj.quantity-=1;
            return true;
          }
          return false;
        })
        state.total -= action.payload.price 
      }
    },
    removeItem:(state,action)=>{
      let price=0,quantity=1;
      state.products=state.products.filter((obj)=>{
        if(obj._id === action.payload.id){
          quantity=obj.quantity;
          price=obj.price;
        }
        return obj._id !==action.payload.id
      })
      state.quantity-=1;

      state.total-=price*quantity;
    }
  },
});

export const { addProduct,counterProduct ,removeItem} = cartSlice.actions;
export default cartSlice.reducer;