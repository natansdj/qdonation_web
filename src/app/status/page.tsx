'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

import Header from '@/components/header';
import Button from '@/components/button';

import { parsingCurrencyRupiah } from '@/utils/Helpers';
import CardStatus from '@/components/cardStatus';
import { useState } from 'react';

export default function Status() {
  const router = useRouter()
  const [status, setStatus] = useState<'success' | 'failed' | 'progress'>('failed')
  const [price, setPrice] = useState<number>(0)

  return <div className={`${status === 'success' ? 'bg-[#1E2128]' : 'bg-[#fff]'} h-[100vh] flex flex-col justify-between`}>
    <div className='overflow-auto h-full no-scrollbar'>
      <Header backAction={() => router.back()} typeIcon='close' transparent />
      <div>
        {status && <CardStatus status={status} price={price} />}
      </div>
      <div className={`footer-button ${status == 'success' && 'h-[160px!important]'}`}>
        <div className={`p-[15px] bg-white flex gap-[15px] border-[#E5E6EB] border-t ${status == 'success' && 'flex-col h-[140px!important]'}`}>
          <Link className='w-full' href='/'><Button title={status == 'success' ? 'Bagikan' : 'Kembali ke Beranda'} /></Link>
          <div className='w-full' onClick={() => setStatus(status == 'success' ? 'progress' : 'success')} ><Button title={status == 'success' ? 'Kembali ke Beranda' : 'Refresh'} type='warning' /></div>
        </div>
      </div>
    </div>
  </div>
}