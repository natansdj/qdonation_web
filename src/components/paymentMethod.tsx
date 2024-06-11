import Image from "next/image";
import Link from "next/link";

import images from "@/configs/images";

import { parsingCurrencyRupiah } from "@/utils/Helpers";
import { useAppSelector } from "@/store";

const PaymentMethod = () => {
  const choose = useAppSelector((state) => state.payment.choose);

  return <>
    <div className='p-[15px] bg-[#fff]'>
      <div className="flex flex-row justify-between mb-[15px]">
        <div className="text-[16px] font-medium text-[#000]">Metode Pembayaran</div>
        <Link href="/checkout/method-payment">
          <div className="text-[16px] font-medium text-[#F7B500] cursor-pointer">Ubah</div>
        </Link>
      </div>
      {choose?.id && <div className='flex gap-[10px] items-center'>
        {choose.icon_url && <img
          src={choose.icon_url}
          className="w-[60px] h-[30px] mr-[10px] object-contain"
          alt={choose.name} />}
        <div>
          <div className="text-[14px] font-bold text-[#1A1B1E]">{choose.type}</div>
          <div className="text-[12px] text-[#1A1B1E] mb-[10px]">{choose.name}</div>
          <div className="text-[16px] font-medium text-[#F7B500]">Rp{parsingCurrencyRupiah('2000000')}</div>
        </div>
      </div>}
    </div>
  </>
}

export default PaymentMethod