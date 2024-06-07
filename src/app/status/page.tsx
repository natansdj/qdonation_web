'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

import Header from '@/components/header';
import Button from '@/components/button';
import CardStatus from '@/components/cardStatus';
import CardStatusDetail from '@/components/cardStatusDetail';

import images from '@/configs/images';

export default function Status() {
  const router = useRouter()
  const [status, setStatus] = useState<'success' | 'failed' | 'progress'>('success')
  const [price, setPrice] = useState<number>(10000)

  return <div className={`${status === 'success' ? 'bg-[#1E2128]' : 'bg-[#fff]'} flex flex-col justify-between`}>
    <div className=''>
      <Header backAction={() => router.back()} typeIcon='close' transparent />
      {status && <CardStatus status={status} price={price} />}
      {status && <CardStatusDetail status={status} price={price} />}
      <div className={`footer-button ${status == 'success' && 'h-[140px!important]'}`}>
        <div className={`p-[15px] bg-white flex gap-[15px] border-[#E5E6EB] border-t ${status == 'success' && 'flex-col h-[140px!important]'}`}>
          <Link className='w-full' href='/'><Button hover={status != 'success'} title={status == 'success' ? <div className='flex flex-row gap-[5px]'>Bagikan <Image src={images.share} alt='' className='w-[20px] h-[20px]' /></div> : 'Kembali ke Beranda'} /></Link>
          <div className='w-full' onClick={() => setStatus(status == 'success' ? 'progress' : 'success')} ><Button title={status == 'success' ? 'Kembali ke Beranda' : 'Refresh'} type='warning' /></div>
        </div>
      </div>
    </div>
  </div>
}