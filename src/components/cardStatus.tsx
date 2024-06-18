import Image from "next/image"

import images from "@/configs/images"

import { IPaymentProsesResponse } from "@/store/paymentSlice";

import { parsingCurrencyRupiah } from "@/utils/Helpers";

const CardStatus = ({ data }: { data: IPaymentProsesResponse }) => {
  return <div className="flex flex-col items-center">
    <div className={`${data?.status == 'success' ? "w-[120px] h-[120px]" : "w-[90px] h-[90px]"} relative mb-[15px]`}>
      <Image src={data?.status == 'success' ? images.statusSuccess : images.statusWarning} alt="" className={data?.status == 'success' ? "w-[120px] h-[120px]" : "w-[90px] h-[90px]"} />
      {data?.status != 'success' && <div className="w-[90px] h-[90px] absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <Image src={(data?.status == 'progress' || data?.status == 'wait_payment') ? images.progress : images.failed} alt="" className="w-[45px] h-[45px]" />
      </div>}
    </div>
    <div className={`${data?.status == 'success' ? 'text-[#00B42A]' : 'text-[#FF7D00]'} text-[16px] font-medium text-center`}>{data?.status == 'success' ? 'TRANSAKSI BERHASIL' : (data?.status == 'progress' ? 'Donasi sedang diproses' : (data?.status == 'wait_payment' ? 'Donasi sedang menunggu pembayaran' : 'Pembayaran gagal'))}</div>
    <div className={`${data?.status == 'success' ? 'text-[#fff]' : 'text-[#111]'} text-[28px] font-semibold text-center`}>Rp{parsingCurrencyRupiah(`${data?.amount || 0}`)}</div>
  </div>
};

export default CardStatus;
