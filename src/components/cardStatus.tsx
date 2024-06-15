import images from "@/configs/images"
import { parsingCurrencyRupiah } from "@/utils/Helpers";
import Image from "next/image"

type Prop = {
  status: 'progress' | 'failed' | 'success' | string,
  price: number
}

const CardStatus = ({ status, price }: Prop) => {
  return <div className="flex flex-col items-center">
    <div className={`${status == 'success' ? "w-[120px] h-[120px]" : "w-[90px] h-[90px]"} relative mb-[15px]`}>
      <Image src={status == 'success' ? images.statusSuccess : images.statusWarning} alt="" className={status == 'success' ? "w-[120px] h-[120px]" : "w-[90px] h-[90px]"} />
      {status != 'success' && <div className="w-[90px] h-[90px] absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <Image src={status == 'progress' ? images.progress : images.failed} alt="" className="w-[45px] h-[45px]" />
      </div>}
    </div>
    <div className={`${status == 'success' ? 'text-[#00B42A]' : 'text-[#FF7D00]'} text-[16px] font-medium text-center`}>{status == 'success' ? 'TRANSAKSI BERHASIL' : (status == 'progress' ? 'Donasi sedang diproses' : 'Pembayaran gagal')}</div>
    <div className={`${status == 'success' ? 'text-[#fff]' : 'text-[#111]'} text-[28px] font-semibold text-center`}>Rp{parsingCurrencyRupiah(`${price || 0}`)}</div>
  </div>
};

export default CardStatus;
