import { configureStore } from "@reduxjs/toolkit"
import counterReducer from './features/counter/counter-slice'
import { apiSlice } from "./features/dogs/dogs-api-slice"
import { createWrapper } from "next-redux-wrapper"

export const makeStore = () => 
  configureStore({
    reducer: { 
      counter: counterReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(apiSlice.middleware)
    }
  });

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false })