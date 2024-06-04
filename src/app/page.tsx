
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'

import Header from "@/components/header";
import Title from '@/components/title';
import ListDonasi from '@/components/listDonasi';

export default function Produk() {
  const router = useRouter();
  const [category, setCategory] = useState('Semua')

  return <div className='bg-white h-[100vh] overflow-auto no-scrollbar'>
    <Header title="Donasi" backAction={() => router.back()} bottomComponent={<div className="flex p-[15px] gap-[10px] overflow-auto text-[12px] no-scrollbar">
      {['Semua', 'Medis & Kesehatan', 'Bencana Alam', 'Pendidikan', 'Sekolah', 'Pendidikan SMA'].map((value) => <div
        key={value}
        onClick={() => setCategory(value)}
        className={`${category == value ? 'bg-[#F7B500] text-[#2A1700] font-semibold' : 'bg-[#F4F3F7] text-[#47483B]'} cursor-pointer p-[15px] rounded-[10px] whitespace-nowrap`}>{value}</div>)}
    </div>} />
    <Title title='Semua Donasi' />
    <ListDonasi data={[
      {
        title: 'Bantu Pasien Rumah Sakit #DanaBerobat',
        category: 'Medis & Kesehatan',
        price: 32500000,
        totalPrice: 132500000,
        day: 120
      }, {
        title: 'Asap Tebal Kebakaran Hutan Kalimantan',
        category: 'Bencana Alam',
        price: 73250000,
        totalPrice: 100000000,
        day: 100
      }, {
        title: 'Asap Tebal Kebakaran Hutan Kalimantan',
        category: 'Bencana Alam',
        price: 73250000,
        totalPrice: 100000000,
        day: 100
      }, {
        title: 'Asap Tebal Kebakaran Hutan Kalimantan',
        category: 'Bencana Alam',
        price: 73250000,
        totalPrice: 100000000,
        day: 100
      }, {
        title: 'Asap Tebal Kebakaran Hutan Kalimantan',
        category: 'Bencana Alam',
        price: 73250000,
        totalPrice: 100000000,
        day: 100
      }, {
        title: 'Asap Tebal Kebakaran Hutan Kalimantan',
        category: 'Bencana Alam',
        price: 73250000,
        totalPrice: 100000000,
        day: 100
      }, {
        title: 'Asap Tebal Kebakaran Hutan Kalimantan',
        category: 'Bencana Alam',
        price: 73250000,
        totalPrice: 100000000,
        day: 100
      }, {
        title: 'Asap Tebal Kebakaran Hutan Kalimantan',
        category: 'Bencana Alam',
        price: 73250000,
        totalPrice: 100000000,
        day: 100
      }
    ]} />
  </div>
}
