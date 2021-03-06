import { createContext, useReducer, FC, Dispatch } from "react";
import { IProduct } from "../types";

interface InitialState { cart: IProduct[], cartItemsNum: number }
export type DispatchCart = Dispatch<CartAction>

let storageData;
if (typeof window !== 'undefined') storageData = localStorage.getItem('cart')
const initialState: InitialState = storageData ?
  { ...JSON.parse(storageData) } : { cart: [], cartItemsNum: 0 }

export enum CART_ACTION {
  GET = "GET",
  ADD = "ADD",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
};

interface CartAction {
  type: CART_ACTION
  payload: IProduct | string
}

interface CartState { cart: IProduct[], cartItemsNum: number }


export const StoreContext = createContext<{
  state: InitialState; dispatch: DispatchCart
}>({ state: initialState, dispatch: () => null });


const storeReducer = (state: CartState, action: CartAction) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION.ADD: {
      let updatedCart;
      const newItem = payload as IProduct;
      const existItem = state.cart.find(({ _id }) => _id === newItem._id)

      if (existItem) updatedCart = state.cart.map(item => item._id === newItem._id ? newItem : item)
      else updatedCart = [...state.cart, newItem]
      const cartItemsNum = updatedCart.reduce((acc, val) => acc + val.qty!, 0)
      return { cart: updatedCart, cartItemsNum }
    }
    case CART_ACTION.DELETE: {
      const removedProductID = payload
      const updatedCart = state.cart.filter(item => item._id !== removedProductID)
      const cartItemsNum = updatedCart.reduce((acc, val) => acc + val.qty!, 0)
      return { cart: updatedCart, cartItemsNum }
    }
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};


const StoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;