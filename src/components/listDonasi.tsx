import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import Progress from "./progress";

import { parsingCurrencyRupiah } from "@/utils/Helpers";
import { ItemProgram } from "@/store/programSlice";

const ListDonasi = memo(({ data }: { data: ItemProgram[] }) => {
  return <div className="flex flex-col px-[15px] gap-[10px]">
    {data.map((item, index) => {
      // let percent = 100 / item.totalPrice * item.price
      // if (percent >= 100) {
      //   percent = 100
      // }
      return <Link href="/detail" key={`${item.id}${index}`} className='p-[10px] border-[#EDEDED] border rounded-[10px]'>
        <div className="relative">
          <Image
            src={item.program_images?.[0]}
            alt=""
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
            priority
          />
          <span className="absolute top-[15px] left-[15px] bg-[rgba(247,181,0,.5)] rounded-[5px] p-[4px] px-[12px] text-[#1A1B1E] text-[10px]">{item?.program_categories?.[0]}</span>
        </div>
        <div className='text-[16px] font-medium text-[#000] mb-[10px]'>{item.name}</div>
        <Progress percent={item.current_progress} />
        <div className="flex justify-between mb-[5px] mt-[15px]">
          <div className='text-[16px] font-medium text-[#000]'>Rp{parsingCurrencyRupiah(`${item.has_target}`)}</div>
          <div className="text-[14px] font-medium text-[#111111]">{moment(item.period_end_date).diff(moment(), "days")} <span className="text-[#787878]">Hari lagi</span></div>
        </div>
      </Link>
    })}
  </div >
}, (prevProps, nextProps) => {
  if (JSON.stringify(prevProps.data) == JSON.stringify(nextProps.data)) {
    return true;
  }
  return false;
})

export default ListDonasi;