'use client'
import { useEffect, useState } from "react";

import { useRouter } from 'next/navigation'
import Image from "next/image";

import Header from "@/components/header";
import Checkbox from "@/components/checkbox";
import AccordionPayment from "@/components/accordionPayment";

import images from "@/configs/images";

import { parsingCurrencyRupiah } from "@/utils/Helpers";

import { useAppDispatch, useAppSelector } from "@/store";
import { getPaymentList, setPaymentChoose } from "@/store/paymentSlice";

export default function MethodPayment() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector((state) => state.payment.dataList);
  const loadingList = useAppSelector((state) => state.payment.loadingList);
  const router = useRouter()
  const [select, setSelect] = useState('')

  useEffect(() => {
    if (!dataList?.items?.length) {
      dispatch(getPaymentList())
    }
  }, [])

  return <div className='bg-[#F5F5F5] flex flex-col justify-between relative'>
    <div className=''>
      <Header title='Metode Pembayaran' backAction={() => router.back()} />
      <div className="p-[15px] flex flex-col gap-[10px]">
        <div>
          <div className="text-[16px] font-medium text-[#1A1B1E] mb-[5px]">Bagaimana kamu melakukan pembayaran</div>
          <div className="text-[14px] text-[#636770]">Tersedia banyak pilihan mudah untuk melakukan pembayaran</div>
        </div>
        {/* <div className='bg-white rounded-[8px] p-[15px]'>
          <div className="text-[16px] font-medium text-[#000] mb-[15px]">QoinCash</div>
          <div className="flex flex-row justify-between cursor-pointer" onClick={() => setSelect('coin' == select ? '' : 'coin')}>
            <div className="flex gap-[10px] items-center">
              <Image className='w-[40px] h-[40px]' src={images.donation} alt='' />
              <div>
                <div className="text-[14px] font-medium text-[#1A1B1E]">QoinCash</div>
                <div className="text-[16px] font-medium text-[#F7B500]">Rp{parsingCurrencyRupiah('2000000')}</div>
              </div>
            </div>
            <Checkbox checked={select == 'coin'} />
          </div>
        </div>
        <div className='bg-white rounded-[8px] p-[15px]'>
          <div className="text-[16px] font-medium text-[#000]">Kartu Debit</div>
          <AccordionPayment title={<Image src={images.card} alt="" className="w-[30px]" />} >
            {['BCA', 'Mandiri', 'BNI'].map(item => <div key={item} onClick={() => setSelect(item == select ? '' : item)} className="border-b border-b-[#DEDEDE] last:border-b-0 py-[10px] flex justify-between">
              <div className="text-[14px] text-[#1A1B1E]">{item}</div>
              <Checkbox checked={select == item} />
            </div>)}
          </AccordionPayment>
        </div>
        <div className='bg-white rounded-[8px] p-[15px]'>
          <div className="text-[16px] font-medium text-[#000]">Transfer lewat bank</div>
          <AccordionPayment title="Bank AGI" >
            {['Bank BCA', 'Bank Mandiri', 'Bank BNI'].map(item => <div key={item} onClick={() => setSelect(item == select ? '' : item)} className="border-b border-b-[#DEDEDE] last:border-b-0 py-[10px] flex justify-between">
              <div className="text-[14px] text-[#1A1B1E]">{item}</div>
              <Checkbox checked={select == item} />
            </div>)}
          </AccordionPayment>
          <AccordionPayment title="Bank Permata" >
            {['Bank BCA', 'Bank Mandiri', 'Bank BNI'].map(item => <div key={item} onClick={() => setSelect(item == select ? '' : item)} className="border-b border-b-[#DEDEDE] last:border-b-0 py-[10px] flex justify-between">
              <div className="text-[14px] text-[#1A1B1E]">{item}</div>
              <Checkbox checked={select == item} />
            </div>)}
          </AccordionPayment>
          <AccordionPayment title="Bank BRI" >
            {['Bank BCA', 'Bank Mandiri', 'Bank BNI'].map(item => <div key={item} onClick={() => setSelect(item == select ? '' : item)} className="border-b border-b-[#DEDEDE] last:border-b-0 py-[10px] flex justify-between">
              <div className="text-[14px] text-[#1A1B1E]">{item}</div>
              <Checkbox checked={select == item} />
            </div>)}
          </AccordionPayment>
          <AccordionPayment title="Bank BNI" >
            {['Bank BCA', 'Bank Mandiri', 'Bank BNI'].map(item => <div key={item} onClick={() => setSelect(item == select ? '' : item)} className="border-b border-b-[#DEDEDE] last:border-b-0 py-[10px] flex justify-between">
              <div className="text-[14px] text-[#1A1B1E]">{item}</div>
              <Checkbox checked={select == item} />
            </div>)}
          </AccordionPayment>
        </div>
        <div className='bg-white rounded-[8px] p-[15px]'>
          <div className="text-[16px] font-medium text-[#000]">Pembayaran Lainnya</div>
          <AccordionPayment title="Loyalty Points" >
            {['Styles', 'MAP Club', 'MyPertamina Points', 'Telkomsel Points'].map(item => <div key={item} onClick={() => setSelect(item == select ? '' : item)} className="border-b border-b-[#DEDEDE] last:border-b-0 py-[10px] flex justify-between">
              <div className="text-[14px] text-[#1A1B1E]">{item}</div>
              <Checkbox checked={select == item} />
            </div>)}
          </AccordionPayment>
        </div> */}
        {loadingList ?
          [1, 2, 3].map(item => <div key={item} className='bg-white rounded-[8px] p-[15px]'>
            <div className='animate-pulse flex flex-col gap-[15px]'>
              <div className='bg-slate-400 h-[20px] w-[150px] rounded mb-[15px]' />
              <div className='bg-slate-400 h-[20px] w-full rounded' />
              <div className='bg-slate-400 h-[1px] w-full rounded' />
              <div className='bg-slate-400 h-[20px] w-full rounded' />
              <div className='bg-slate-400 h-[1px] w-full rounded' />
              <div className='bg-slate-400 h-[20px] w-full rounded' />
            </div>
          </div>)
          :
          dataList?.items?.map(items => <div key={items.id} className='bg-white rounded-[8px] p-[15px]'>
            <div className="text-[16px] font-medium text-[#000]">{items.name}</div>
            {items.channels.map(item => {
              let is_active = item.is_active
              if (!items.is_active) {
                is_active = false
              }
              return <div key={item.id} onClick={() => {
                if (is_active) {
                  const value = item.code == select ? '' : item.code
                  setSelect(value)
                  dispatch(setPaymentChoose({ ...item, type: items.name }))
                }
              }} className="border-b border-b-[#DEDEDE] last:border-b-0 py-[10px]">
                <div className={`flex justify-between ${is_active ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                  <div className="flex items-center">
                    {item.icon_url && <img
                      src={item.icon_url}
                      className="w-[60px] h-[30px] mr-[10px] object-contain"
                      alt={item.name} />}
                    <div className={`text-[14px] ${is_active ? 'text-[#1A1B1E]' : 'text-[#C6C6C6]'}`}>{item.name}</div>
                  </div>
                  <Checkbox checked={select == item.code} />
                </div>
              </div>
            })}
          </div>)}
      </div>
    </div>
  </div>
}