'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/button';
import Header from '@/components/header';
import PaymentMethod from '@/components/paymentMethod';
import CardDonationAmount from '@/components/cardDonationAmount';

import images from '@/configs/images';

import { parsingCurrencyRupiah } from '@/utils/Helpers';
import { useAppDispatch, useAppSelector } from '@/store';
import { getPaymentList } from '@/store/paymentSlice';

export default function Detail() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector((state) => state.payment.dataList);
  const router = useRouter()
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!dataList?.items?.length) {
      dispatch(getPaymentList())
    }
  }, [])

  return <div className='bg-[#F5F5F5] flex flex-col justify-between relative'>
    <div className=''>
      <Header title='Checkout' backAction={() => router.back()} />
      <div className='flex flex-col gap-[10px]'>
        <div className='p-[15px] bg-[#fff]'>
          <div className='text-[18px] font-medium text-[#1A1B1E] mb-[15px]'>Rincian Donasi</div>
          <div className='flex items-center gap-[10px]'>
            <Image className='w-[40px] h-[40px]' src={images.donation} alt='' />
            <div className='text-[16px] font-medium text-[#000]'>Bantu Pasien Rumah Sakit #DanaBerobat</div>
          </div>
        </div>
        <CardDonationAmount change={(e) => setValue(e)} />
        <PaymentMethod />
      </div>
      <div className='footer-button'>
        <div className='p-[15px] bg-white flex justify-between items-center border-[#E5E6EB] border-t'>
          <div>
            <div className='text-[12px] text-[#1A1B1E] font-medium mb-[5px]'>Total Bayar</div>
            <div className='text-[20px] text-[#1A1B1E] font-medium'>Rp{parsingCurrencyRupiah(`${value || 0}`)}</div>
          </div>
          <Link href='/status' className='min-w-[180px]'><Button title='Bayar Sekarang' type='warning' /></Link>
        </div>
      </div>
    </div>
  </div>
}