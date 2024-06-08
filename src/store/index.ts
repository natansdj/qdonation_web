import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { IProgramState, programReducer } from "./programSlice";
import { IAuthState, authReducer } from "./authSlice";


export interface StoreStateType {
  auth: IAuthState;
  program: IProgramState;
}

const persistConfig = {
  key: "root",
  storage,
  blacklist: ['program']
};

const rootReducer = combineReducers({
  auth: authReducer,
  program: programReducer
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