import moment from "moment";
import Image from "next/image"

import images from "@/configs/images"

import { parsingCurrencyRupiah } from "@/utils/Helpers";

import Accordion from "./accordion";

import { useAppDispatch } from "@/store";
import { setAlertState } from "@/store/programSlice";
import { IPaymentProsesResponse } from "@/store/paymentSlice";

const CardStatusDetail = ({ data }: { data: IPaymentProsesResponse }) => {
  const dispatch = useAppDispatch();

  const handleCopy = (text: string) => {
    let dummy = document.createElement('input')
    document.body.appendChild(dummy)
    dummy.setAttribute('value', text)
    dummy.select()
    document.execCommand('copy')
    document.body.removeChild(dummy)

    dispatch(setAlertState({
      type: 'warning',
      header: 'Tersalin',
      description: `kode telah tersalin`,
    }));
  }

  const cardTotal = (<>
    <div className="flex flex-row justify-between text-[14px] font-medium text-[#4E5969]">
      <div>Tanggal Transaksi</div>
      <div className="text-[#1D2129]">{moment(data?.created_at).format('DD/MM/YYYY HH:mm')}</div>
    </div>
    <div className="flex flex-row justify-between text-[14px] font-medium text-[#4E5969]">
      <div>Jumlah</div>
      <div className="text-[#1D2129]">Rp{parsingCurrencyRupiah(`${data?.amount || 0}`)}</div>
    </div>
    <div className="flex flex-row justify-between text-[14px] font-medium text-[#1D2129]">
      <div>Total</div>
      <div>Rp{parsingCurrencyRupiah(`${data?.amount || 0}`)}</div>
    </div>
  </>)
  const cardRefrensiTRX = (data?.payment_info?.trx_no || data?.payment_info?.reference_no) ? (<Accordion defaultShow iconDown title={<div className="text-[14px] font-semibold text-[#1D2129]">Rincian Referensi</div>} >
    <div className="p-[15px] pt-0 flex flex-col gap-[10px]">
      {data?.payment_info?.trx_no && <div className="flex flex-row justify-between text-[14px] font-medium text-[#4E5969]">
        <div>No. Transaksi</div>
        <div className="text-[#1D2129] flex items-center gap-[5px]">{data?.payment_info?.trx_no}<Image onClick={() => data?.payment_info?.trx_no && handleCopy(data?.payment_info?.trx_no)} src={images.copy} alt="" className="w-[20px] h-[20px] cursor-pointer" /></div>
      </div>}
      {data?.payment_info?.reference_no && <div className="flex flex-row justify-between text-[14px] font-medium text-[#4E5969]">
        <div>No. Referensi</div>
        <div className="text-[#1D2129] flex items-center gap-[5px]">{data?.payment_info?.reference_no}<Image onClick={() => data?.payment_info?.reference_no && handleCopy(data?.payment_info?.reference_no)} src={images.copy} alt="" className="w-[20px] h-[20px] cursor-pointer" /></div>
      </div>}
    </div>
  </Accordion>) : null

  if (data?.status == 'success') {
    return <>
      <div className='p-[15px] pt-[40px] mt-[90px] rounded-[30px] bg-white min-h-[calc(100vh-465px)]'>
        <div className='-mt-[130px]'>
          <div className={`shadow-[0_6px_15px_-2px_rgba(16,24,40,.10)] rounded-[8px] p-[15px] mt-[20px] bg-white m-[15px] h-[110px]`}>
            <div className='text-[16px] font-medium text-[#1D2129] mb-[10px]'>Donasi</div>
            <div className='flex items-center gap-[10px]'>
              <Image className='w-[40px] h-[40px]' src={images.donation} alt='' />
              <div className='text-[16px] font-medium text-[#000] line-clamp-2'>{data?.program_name}</div>
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
                  <div className="text-[#1D2129]">{data?.payment_info?.payment_method_name}</div>
                </div>
                {data?.payment_info?.payment_channel_name && <div className="flex flex-row justify-between text-[14px] font-medium text-[#4E5969]">
                  <div>Nama Bank</div>
                  <div className="text-[#1D2129]">{data?.payment_info?.payment_channel_name}</div>
                </div>}
                {cardTotal}
              </div>
            </Accordion>
          </div>
          <div className="bg-[#E5E6EB] h-[1.5px]" />
          <div className="-mx-[15px]">
            {cardRefrensiTRX}
          </div>
        </div>
      </div>
    </>
  }
  return <div>
    <div className={`shadow-[0_0_15px_-2px_rgba(16,24,40,.08)] rounded-[8px] p-[15px] mt-[20px] bg-white m-[15px]`}>
      <div className='flex items-center gap-[10px]'>
        <Image className='w-[40px] h-[40px]' src={images.donation} alt='' />
        <div className='text-[16px] font-medium text-[#000]'>{data?.program_name}</div>
      </div>
      <div className='mt-[15px] pt-[15px] flex flex-row justify-between border-t-[#EDEDED] border-t-[2px] border-dashed'>
        <div className='text-[#4E5969] text-[14px] font-medium'>Nominal Donasi</div>
        <div className='text-[#1D2129] text-[14px] font-medium'>Rp{parsingCurrencyRupiah(`${data?.amount || 0}`)}</div>
      </div>
      <div className='bg-[#FDF3E6] p-[15px] rounded-[8px] mt-[15px] flex flex-row gap-[10px] items-center'>
        <Image className='w-[24px] h-[24px]' src={images.clock} alt='' />
        <div className='text-[#1A1B1E] text-[12px]'>Pembayaran donasi sedang kami diproses, Harap tunggu sebentar hingga transaksi berhasil.</div>
      </div>
    </div>
    <div>
      <Accordion defaultShow iconDown title={<div className="text-[14px] font-semibold text-[#1D2129]">Rincian Transaksi</div>} >
        <div className="p-[15px] pt-0 flex flex-col gap-[10px]">
          <div className="flex flex-row justify-between text-[14px] font-medium text-[#4E5969]">
            <div>Metode Pembayaran</div>
            <div className="text-[#1D2129]">{data?.payment_info?.payment_method_name}</div>
          </div>
          {data?.payment_info?.payment_channel_name && <div className="flex flex-row justify-between text-[14px] font-medium text-[#4E5969]">
            <div>Nama Bank</div>
            <div className="text-[#1D2129]">{data?.payment_info?.payment_channel_name}</div>
          </div>}
          {data?.payment_info?.va_number && <div className="flex flex-row justify-between text-[14px] font-medium text-[#4E5969]">
            <div>No Virtual Account</div>
            <div className="text-[#1D2129] flex items-center gap-[5px]">{data?.payment_info?.va_number}<Image onClick={() => data?.payment_info?.va_number && handleCopy(data?.payment_info?.va_number)} src={images.copy} alt="" className="w-[20px] h-[20px] cursor-pointer" /></div>
          </div>}
          {cardTotal}
        </div>
      </Accordion>
    </div>
    <div className="bg-[#E5E6EB] h-[1.5px]" />
    <div>
      {cardRefrensiTRX}
    </div>
  </div>
};

export default CardStatusDetail;
