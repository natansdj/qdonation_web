import moment from "moment";
import Image from "next/image"

import images from "@/configs/images"

import { parsingCurrencyRupiah } from "@/utils/Helpers";

import Accordion from "./accordion";

import { useAppDispatch } from "@/store";
import { setAlertState } from "@/store/programSlice";
import { IPaymentProsesResponse } from "@/store/paymentSlice";

const CardInstruction = ({ data }: { data: IPaymentProsesResponse }) => {
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

  return <div>
    <div className="bg-[#191717] p-[15px] h-[190px]" >
      <div className="flex flex-row justify-end">
        <div className="flex flex-row items-center">
          <Image className="w-[24px] h-[24px]" src={images.indonesia} alt="" />
          <div className="text-white text-[14px] font-bold pt-[4px] mx-[10px]">INA</div>
          <Image className="w-[24px] h-[24px]" src={images.arrowDownWhite} alt="" />
        </div>
      </div>
    </div>
    <div className="-mt-[100px] h-[175px] relative">
      <div className={`shadow-[3px_7px_17px_0px_rgba(0,0,0,0.07)] rounded-[8px] bg-white m-[15px] pb-[15px] z-20`}>
        <div className="p-[15px] pb-0">
          <div className='flex items-center flex-row justify-between border-b-[1px] border-[#DEDEDE] pb-[15px]'>
            <div className='text-[12px] font-semibold text-[#231F20] line-clamp-1'>{data?.program_name}</div>
            <div className="flex items-center gap-[10px]">
              <div className='text-[8px] font-semibold text-[#231F20]'>Choose within</div>
              <div className='text-[12px] font-semibold text-[#E83F3F]'>{moment().format('HH:mm:ss')}</div>
            </div>
          </div>
          <div className='text-[26px] font-bold text-[#383435] pt-[15px]'>Rp{parsingCurrencyRupiah(`${data?.amount || 0}`)}</div>
        </div>
        <Accordion defaultShow iconDown title={<div className="text-[14px] font-semibold text-[#1D2129]">Order ID {data?.payment_info?.trx_no}</div>} >
          <div className="p-[15px] py-0">
            <div className="flex flex-col gap-[10px] border-t-[1px] border-[#DEDEDE] py-[15px]">
              <div className="text-[14px] text-[#000] font-bold">Customer Order Detail</div>
              <div className="flex flex-row justify-between text-[14px] font-medium text-[#4E5969]">
                <div>Name</div>
                <div className="text-[#1D2129]">Andi M</div>
              </div>
              <div className="flex flex-row justify-between text-[14px] font-medium text-[#4E5969]">
                <div>Phone Number</div>
                <div className="text-[#1D2129]">087882293897</div>
              </div>
              <div className="flex flex-row justify-between text-[14px] font-medium text-[#4E5969]">
                <div>Email</div>
                <div className="text-[#1D2129]">Andimulyana@gmail.coom</div>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] border-t-[1px] border-[#DEDEDE] py-[15px]">
              <div className="text-[14px] text-[#000] font-bold">Amount Detail</div>
              <div className="flex flex-row justify-between text-[14px] font-medium text-[#4E5969]">
                <div>Subtotal</div>
                <div className="text-[#1D2129]">Rp{parsingCurrencyRupiah(`${data?.amount || 0}`)}</div>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] border-t-[1px] border-[#DEDEDE] py-[15px]">
              <div className="text-[14px] text-[#000] font-bold">Payment Detail</div>
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
          </div>
        </Accordion>
      </div>
    </div>
    <div className="p-[15px]"></div>
  </div>
};

export default CardInstruction;
