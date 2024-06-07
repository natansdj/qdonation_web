import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import Progress from "./progress";

import { parsingCurrencyRupiah } from "@/utils/Helpers";
import { ItemProgram } from "@/store/programSlice";
import CardImage from "./cardImage";

const ListDonasi = ({ data, loading }: { data: ItemProgram[], loading: boolean }) => {
  return <div className="flex flex-col px-[15px] gap-[10px]">
    {loading ?
      [1, 2, 3, 4, 5].map(item => <div key={item} className='p-[10px] border-[#EDEDED] border rounded-[10px] animate-pulse'>
        <div className='bg-slate-400 h-[288px] w-full' />
        <div className='bg-slate-400 w-[100px] h-[20px] my-[10px]' />
        <div className='bg-slate-400 h-[3px] w-full rounded' />
      </div>)
      :
      data.length ? data.map((item, index) => {
        // let percent = 100 / item.totalPrice * item.price
        // if (percent >= 100) {
        //   percent = 100
        // }
        return <Link href={`/detail/${item.id}`} key={`${item.id}${index}`} className='p-[10px] border-[#EDEDED] border rounded-[10px]'>
          <CardImage url={item.program_images?.[0]} category={item?.program_categories?.[0]} />
          <div className='text-[16px] font-medium text-[#000] my-[10px]'>{item.name}</div>
          <Progress percent={item.current_progress} />
          <div className="flex justify-between mb-[5px] mt-[15px]">
            <div className='text-[16px] font-medium text-[#000]'>Rp{parsingCurrencyRupiah(`${item.has_target}`)}</div>
            <div className="text-[14px] font-medium text-[#111111]">{moment(item.period_end_date).diff(moment(), "days")} <span className="text-[#787878]">Hari lagi</span></div>
          </div>
        </Link>
      })
        :
        <div className="flex justify-center py-4">
          <div className="text-[20px] font-bold">Tidak tersedia Donasi</div>
        </div>}
  </div >
}

ListDonasi.displayName = 'ListDonasi';

export default ListDonasi;