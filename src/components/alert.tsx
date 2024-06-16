"use client"
import { useAppDispatch, useAppSelector } from "@/store";
import { setAlertState } from "@/store/programSlice";
import { useEffect } from "react";

export type alertProp = {
  header?: string | React.ReactNode,
  description?: string | React.ReactNode,
  type?: 'warning' | 'danger' | string
}

let timeout: any
const Alert = () => {
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.program.alert);

  useEffect(() => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch(setAlertState({}))
    }, 3000);
  }, [alert?.header])

  return alert?.header ? <div className="absolute z-[9999999] top-[20px] left-0 right-0 flex justify-center">
    <div
      className={`bg-white text-[#2A1700] border ${alert?.type == 'warning' ? ` bg-[#fff3cd!important] border-[#ffeeba!important] text-[#856404!important]` : (alert?.type == 'danger' ? ` bg-[#f8d7da!important] border-[#f5c6cb!important] text-[#721c24!important]` : ` `)} rounded-[8px] text-center text-[14px] font-semibold px-[15px] py-[5px]`}>
      <div>{alert?.header}</div>
      <div className="mt-[5px] text-[12px]">{alert?.description}</div>
    </div>
  </div> : null
};

export default Alert;
