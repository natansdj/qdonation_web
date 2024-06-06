import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import Progress from "./progress";

import { parsingCurrencyRupiah } from "@/utils/Helpers";
import { ItemProgram } from "@/store/programSlice";
import CardImage from "./cardImage";

const ListDonasi = memo(({ data }: { data: ItemProgram[] }) => {
  return <div className="flex flex-col px-[15px] gap-[10px]">
    {data.map((item, index) => {
      // let percent = 100 / item.totalPrice * item.price
      // if (percent >= 100) {
      //   percent = 100
      // }
      return <Link href="/detail" key={`${item.id}${index}`} className='p-[10px] border-[#EDEDED] border rounded-[10px]'>
        <CardImage url={item.program_images?.[0]} category={item?.program_categories?.[0]} />
        <div className='text-[16px] font-medium text-[#000] my-[10px]'>{item.name}</div>
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

ListDonasi.displayName = 'ListDonasi';

export default ListDonasi;