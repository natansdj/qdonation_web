import { useSelector } from "react-redux";
import type { StoreStateType } from "../store";

export const useProgramData = () => {
  return useSelector((state: StoreStateType) => state.program);
};

export const useChatData = () => {
  return useSelector((state: StoreStateType) => state.auth.authState);
};