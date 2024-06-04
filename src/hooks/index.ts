import { useSelector } from "react-redux";
import type { StoreStateType } from "../store";

export const useUserData = () => {
  return useSelector((state: StoreStateType) => state.user.userState);
};

export const useChatData = () => {
  return useSelector((state: StoreStateType) => state.auth.authState);
};