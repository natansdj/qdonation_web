'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/button';
import images from '@/configs/images';
import Header from '@/components/header';

import CardDonationAmount from '@/components/cardDonationAmount';
import PaymentMethod from '@/components/paymentMethod';

import { parsingCurrencyRupiah } from '@/utils/Helpers';

export default function Detail() {
  const router = useRouter()
  const [value, setValue] = useState('')

  return <div className='bg-[#F5F5F5] h-[100vh] flex flex-col justify-between relative'>
    <div className='overflow-auto h-full no-scrollbar'>
      <Header title='Checkout' backAction={() => router.back()} />
      <div className='flex flex-col gap-[10px]'>
        <div className='p-[15px] bg-[#fff]'>
          <div className='text-[18px] font-medium text-[#1A1B1E] mb-[15px]'>Rincian Donasi</div>
          <div className='flex gap-[10px]'>
            <Image className='w-[40px] h-[40px]' src={images.donation} alt='' />
            <div className='text-[16px] font-medium text-[#000]'>Bantu Pasien Rumah Sakit #DanaBerobat</div>
          </div>
        </div>
        <CardDonationAmount onChange={(e) => setValue(e)} />
        <PaymentMethod />
      </div>
    </div>
    <div className='p-[15px] bg-white flex justify-between items-center'>
      <div>
        <div className='text-[12px] text-[#1A1B1E] font-medium mb-[5px]'>Total Bayar</div>
        <div className='text-[20px] text-[#1A1B1E] font-medium'>Rp{parsingCurrencyRupiah(`${value || 0}`)}</div>
      </div>
      <Link href='/checkout' className='min-w-[180px]'><Button title='Bayar Sekarang' type='warning' /></Link>
    </div>
  </div>
}