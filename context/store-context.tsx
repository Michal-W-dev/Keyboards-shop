import { createContext, useReducer, FC, Dispatch } from "react";
import { IProduct } from "../types";

interface InitialState { cart: IProduct[] }

const initialState: InitialState = { cart: [] }

export enum CART_ACTION {
  GET = "GET",
  ADD = "ADD",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
};

interface CartAction {
  type: CART_ACTION
  payload: IProduct | number
}

interface CartState { cart: IProduct[] }


export const StoreContext = createContext<{
  state: InitialState; dispatch: Dispatch<CartAction>
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

      return { cart: updatedCart }
    }
    case CART_ACTION.DELETE: {
      const removedProductID = payload
      const updatedCart = state.cart.filter(item => item._id !== removedProductID)
      return { cart: updatedCart }
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