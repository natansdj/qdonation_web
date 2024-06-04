'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

import Header from '@/components/header';
import Progress from '@/components/progress';
import Accordion from '@/components/accordion';
import Button from '@/components/button';

import { parsingCurrencyRupiah } from '@/utils/Helpers';

export default function Detail() {
  const router = useRouter()

  return <div className='bg-[#F5F5F5] h-[100vh] flex flex-col justify-between'>
    <div className='overflow-auto h-full no-scrollbar'>
      <Header backAction={() => router.back()} />
      <div>
        <div className='h-[200px] w-full'></div>
        <div className='p-[15px] bg-[#fff]'>
          <div className='text-[16px] font-medium text-[#000] mb-[15px]'>Bantu Pasien Rumah Sakit #DanaBerobat</div>
          <div className='flex gap-[10px] mb-[15px]'>
            <div className='text-[#F7B500] text-[16px] font-medium'>Rp{parsingCurrencyRupiah('13200000')}</div>
            <div className='text-[#111111] text-[14px]'>Rp{parsingCurrencyRupiah('103200000')}</div>
          </div>
          <Progress percent={10} />
          <div className='text-[#111111] text-[14px] mt-[15px]'>281 Donasi</div>
          <div className='text-[#76767A] text-[13px] mt-[15px] pt-[15px] border-t-[#EDEDED] border-t-[2px] border-dashed'>Berlaku sampai 25 Jun 2024</div>
        </div>
        <div className='flex flex-col gap-[10px] mt-[10px]'>
          <Accordion title='Informasi Penggalangan Dana'>Informasi Penggalangan Dana</Accordion>
          <Accordion title='Cerita Penggalangan Dana'>Cerita Penggalangan Dana</Accordion>
          <Accordion title='Kabar Terbaru'>Kabar Terbaru</Accordion>
          <Accordion title='Pencairan Dana'>Pencairan Dana</Accordion>
        </div>
      </div>
      <div className='footer-button'>
        <div className='p-[15px] bg-white'>
          <Link href='/checkout'><Button title='Donasi Sekarang' type='warning' /></Link>
        </div>
      </div>
    </div>
  </div>
}