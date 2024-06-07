import images from "@/configs/images"
import { parsingCurrencyRupiah } from "@/utils/Helpers";
import Image from "next/image"
import Accordion from "./accordion";
import Alert from "./alert";
import { useState } from "react";

type Prop = {
  status: 'progress' | 'failed' | 'success',
  price: number
}

let timeout: any
const CardStatusDetail = ({ status, price }: Prop) => {
  const [alert, setAlert] = useState<{ header?: string, type?: string, description?: string }>()

  const handleCopy = (text: string) => {
    let dummy = document.createElement('input')
    document.body.appendChild(dummy)
    dummy.setAttribute('value', text)
    dummy.select()
    document.execCommand('copy')
    document.body.removeChild(dummy)

    // message.success(`${type} telah tersalin`);
    setAlert({
      type: 'warning',
      header: 'Tersalin',
      description: `kode telah tersalin`,
    })
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      setAlert({})
    }, 3000);
  }

  if (status == 'success') {
    return <>
      <div className='p-[15px] pt-[40px] mt-[90px] rounded-[30px] bg-white min-h-[calc(100vh-465px)]'>
        <div className='-mt-[130px]'>
          <div className={`shadow-[0_6px_15px_-2px_rgba(16,24,40,.10)] rounded-[8px] p-[15px] mt-[20px] bg-white m-[15px] h-[110px]`}>
            <div className='text-[16px] font-medium text-[#1D2129] mb-[10px]'>Donasi</div>
            <div className='flex items-center gap-[10px]'>
              <Image className='w-[40px] h-[40px]' src={images.donation} alt='' />
              <div className='text-[16px] font-medium text-[#000] line-clamp-2'>Bantu Pasien Rumah Sakit #DanaBerobat</div>
            </div>
          </div>
          <div className="-mx-[15px]">
            <Accordion defaultShow iconDown title={<div className="text-[14px] font-semibold text-[#1D2129]">Rincian Transaksi</div>} >
              <div className="p-[15px] pt-0 flex flex-col gap-[10px]">
                <div className="flex flex-row justify-between text-[14px] font-medium text-[#4E5969]">
                  <div>Status</div>
                  <div className="text-[#009A29]">Berhasil</div>
                </div>
                <div className="flex flex-row justify-between text-[14px] font-medium text-[#4E5969]">
                  <div>Metode Pembayaran</div>
                  <div className="text-[#1D2129]">QoinCash</div>
                </div>
                <div className="flex flex-row justify-between text-[14px] font-medium text-[#4E5969]">
                  <div>Tanggal Transaksi</div>
                  <div className="text-[#1D2129]">19/08/2023 12:45</div>
                </div>
                <div className="flex flex-row justify-between text-[14px] font-medium text-[#4E5969]">
                  <div>Jumlah</div>
                  <div className="text-[#1D2129]">Rp250.000</div>
                </div>
                <div className="flex flex-row justify-between text-[14px] font-medium text-[#1D2129]">
                  <div>Total</div>
                  <div>Rp250.000</div>
                </div>
              </div>
            </Accordion>
          </div>
          <div className="bg-[#E5E6EB] h-[1.5px]" />
          <div className="-mx-[15px]">
            <Accordion defaultShow iconDown title={<div className="text-[14px] font-semibold text-[#1D2129]">Rincian Referensi</div>} >
              <div className="p-[15px] pt-0 flex flex-col gap-[10px]">
                <div className="flex flex-row justify-between text-[14px] font-medium text-[#4E5969]">
                  <div>No. Transaksi</div>
                  <div className="text-[#1D2129] flex items-center gap-[5px]">23129080001<Image onClick={() => handleCopy('23129080001')} src={images.copy} alt="" className="w-[20px] h-[20px] cursor-pointer" /></div>
                </div>
                <div className="flex flex-row justify-between text-[14px] font-medium text-[#4E5969]">
                  <div>No. Referensi</div>
                  <div className="text-[#1D2129] flex items-center gap-[5px]">0230291055<Image onClick={() => handleCopy('0230291055')} src={images.copy} alt="" className="w-[20px] h-[20px] cursor-pointer" /></div>
                </div>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
      {alert?.header && <Alert {...alert} />}
    </>
  }
  return <div className={`shadow-[0_0_15px_-2px_rgba(16,24,40,.08)] rounded-[8px] p-[15px] mt-[20px] bg-white m-[15px]`}>
    <div className='flex items-center gap-[10px]'>
      <Image className='w-[40px] h-[40px]' src={images.donation} alt='' />
      <div className='text-[16px] font-medium text-[#000]'>Bantu Pasien Rumah Sakit #DanaBerobat</div>
    </div>
    <div className='mt-[15px] pt-[15px] flex flex-row justify-between border-t-[#EDEDED] border-t-[2px] border-dashed'>
      <div className='text-[#4E5969] text-[14px] font-medium'>Nominal Donasi</div>
      <div className='text-[#1D2129] text-[14px] font-medium'>Rp{parsingCurrencyRupiah(`${price || 0}`)}</div>
    </div>
    <div className='bg-[#FDF3E6] p-[15px] rounded-[8px] mt-[15px] flex flex-row gap-[10px] items-center'>
      <Image className='w-[24px] h-[24px]' src={images.clock} alt='' />
      <div className='text-[#1A1B1E] text-[12px]'>Pembayaran donasi sedang kami diproses, Harap tunggu sebentar hingga transaksi berhasil.</div>
    </div>
  </div>
};

export default CardStatusDetail;
