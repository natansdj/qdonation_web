import Image from "next/image";

import images from "@/configs/images";

import { parsingCurrencyRupiah } from "@/utils/Helpers";
import Link from "next/link";

type Prop = {
  title?: string,
  transparent?: boolean,
  backAction?: () => void,
  bottomComponent?: React.ReactNode
};

const PaymentMethod = ({ title, transparent, backAction, bottomComponent }: Prop) => {

  return <>
    <div className='p-[15px] bg-[#fff]'>
      <div className="flex flex-row justify-between mb-[15px]">
        <div className="text-[16px] font-medium text-[#000]">Metode Pembayaran</div>
        <Link href="/checkout/method-payment">
          <div className="text-[16px] font-medium text-[#F7B500] cursor-pointer">Ubah</div>
        </Link>
      </div>
      <div className='flex gap-[10px] items-center'>
        <Image className='w-[40px] h-[40px]' src={images.donation} alt='' />
        <div>
          <div className="text-[14px] font-medium text-[#1A1B1E]">QoinCash</div>
          <div className="text-[16px] font-medium text-[#F7B500]">Rp{parsingCurrencyRupiah('2000000')}</div>
        </div>
      </div>
    </div>
  </>
}

export default PaymentMethod