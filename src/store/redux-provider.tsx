"use client";

import { Provider } from "react-redux";
import { store } from "./index";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}><PersistGate persistor={persistor}>{children}</PersistGate></Provider>;
}
