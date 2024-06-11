import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { IProgramState, programReducer } from "./programSlice";
import { IAuthState, authReducer } from "./authSlice";
import { IPaymentState, paymentReducer } from "./paymentSlice";


export interface StoreStateType {
  auth: IAuthState;
  program: IProgramState;
  payment: IPaymentState;
}

const persistConfig = {
  key: "root",
  storage,
  blacklist: ['program', 'payment']
};

const rootReducer = combineReducers({
  auth: authReducer,
  program: programReducer,
  payment: paymentReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;