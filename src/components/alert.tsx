"use client"
import { useEffect, useState } from "react";
import Image from "next/image";

import images from "@/configs/images";

import { useAppDispatch, useAppSelector } from "@/store";
import { setAlertState } from "@/store/programSlice";

export type alertProp = {
  header?: string | React.ReactNode,
  description?: string | React.ReactNode,
  type?: 'warning' | 'danger' | string,
  index?: number,
}

const CardAlert = ({ data, clear }: { data: alertProp, clear: (a: number) => void }) => {

  return <div
    className={`mb-[10px] relative bg-white min-w-1 text-[#2A1700] border ${data?.type == 'warning' ? ` bg-[#fff3cd!important] border-[#ffeeba!important] text-[#856404!important]` : (data?.type == 'danger' ? ` bg-[#f8d7da!important] border-[#f5c6cb!important] text-[#721c24!important]` : ` `)} rounded-[8px] text-center text-[14px] font-semibold px-[15px] py-[5px]`}>
    <div className="px-[20px]" >{data?.header}</div>
    <div className="mt-[5px] text-[12px]">{data?.description}</div>
    <Image src={images.close} alt="" className="absolute right-1 top-1 h-[20px] w-[20px] cursor-pointer" onClick={() => data?.index && clear(data?.index)} />
  </div>
}

const Alert = () => {
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.program.alert);
  const [list, setList] = useState<alertProp[]>([])

  useEffect(() => {
    if (alert?.header) {
      dispatch(setAlertState({}))
      setList([...list, { ...alert, index: Date.now() }])
    }
  }, [alert?.header])

  return list?.length ? <div className="absolute z-[9999999] top-[20px] left-0 right-0 flex justify-center">
    <div className="fixed flex flex-col items-center">
      {list.map((item) => <CardAlert key={item.index} data={item} clear={(i) => {
        const listFilter = list.filter((fil) => fil.index != i)

        setList(listFilter)
      }} />)}
    </div>
  </div> : null
};

export default Alert;
