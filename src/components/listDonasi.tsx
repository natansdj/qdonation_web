import Link from "next/link";
import Progress from "./progress";

import { parsingCurrencyRupiah } from "@/utils/Helpers";

type Prop = {
  title: string,
  category: string,
  price: number,
  totalPrice: number,
  day: number,

};

const ListDonasi = ({ data }: { data: Prop[] }) => {

  return <div className="flex flex-col px-[15px] gap-[10px]">
    {data.map((item, index) => {
      let percent = 100 / item.totalPrice * item.price
      if (percent >= 100) {
        percent = 100
      }
      return <Link href="/detail" key={`${item.title}${index}`} className='p-[10px] border-[#EDEDED] border rounded-[10px]'>
        <span className="bg-[rgba(247,181,0,.5)] rounded-[5px] p-[4px] px-[12px] text-[#1A1B1E] text-[10px]">{item.category}</span>
        <div className='text-[16px] font-medium text-[#000] mt-[100px] mb-[10px]'>{item.title}</div>
        <Progress percent={percent} />
        <div className="flex justify-between mb-[5px] mt-[15px]">
          <div className='text-[16px] font-medium text-[#000]'>Rp{parsingCurrencyRupiah(`${item.price}`)}</div>
          <div className="text-[14px] font-medium text-[#111111]">{item.day} <span className="text-[#787878]">Hari lagi</span></div>
        </div>
      </Link>
    })}
  </div >
};

export default ListDonasi;