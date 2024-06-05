'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

import Header from '@/components/header';
import Button from '@/components/button';

import CardStatus from '@/components/cardStatus';
import { useState } from 'react';
import Image from 'next/image';
import images from '@/configs/images';
import { parsingCurrencyRupiah } from '@/utils/Helpers';

export default function Status() {
  const router = useRouter()
  const [status, setStatus] = useState<'success' | 'failed' | 'progress'>('failed')
  const [price, setPrice] = useState<number>(10000)

  return <div className={`${status === 'success' ? 'bg-[#1E2128]' : 'bg-[#fff]'} h-[100vh] flex flex-col justify-between`}>
    <div className='overflow-auto h-full no-scrollbar'>
      <Header backAction={() => router.back()} typeIcon='close' transparent />
      <div className='p-[15px]'>
        {status && <CardStatus status={status} price={price} />}
        <div className='shadow-[0_0_15px_-2px_rgba(16,24,40,.08)] rounded-[8px] p-[15px] mt-[20px]'>
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
      </div>
      <div className={`footer-button ${status == 'success' && 'h-[160px!important]'}`}>
        <div className={`p-[15px] bg-white flex gap-[15px] border-[#E5E6EB] border-t ${status == 'success' && 'flex-col h-[140px!important]'}`}>
          <Link className='w-full' href='/'><Button hover={status != 'success'} title={status == 'success' ? <div className='flex flex-row gap-[5px]'>Bagikan <Image src={images.share} alt='' className='w-[20px] h-[20px]' /></div> : 'Kembali ke Beranda'} /></Link>
          <div className='w-full' onClick={() => setStatus(status == 'success' ? 'progress' : 'success')} ><Button title={status == 'success' ? 'Kembali ke Beranda' : 'Refresh'} type='warning' /></div>
        </div>
      </div>
    </div>
  </div>
}