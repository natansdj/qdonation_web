
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

import Header from "@/components/header";
import Title from '@/components/title';
import ListDonasi from '@/components/listDonasi';

import { useAppDispatch, useAppSelector } from '@/store';
import { getListProgram, getListProgramCategories } from '@/store/programSlice';
import ListCardCategory from '@/components/listCardCategory';

export default function Produk() {
  const programState = useAppSelector((state) => state.program);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!programState.loadingList) {
      dispatch(getListProgram())
      dispatch(getListProgramCategories())
    }
  }, [])

  return <div className='bg-white h-[100vh] overflow-auto no-scrollbar'>
    <Header title="Donasi" backAction={() => router.back()} bottomComponent={<ListCardCategory data={programState?.dataListCategory?.items || []} />} />
    <Title title='Semua Donasi' />
    <ListDonasi data={programState?.dataList?.items || []} />
  </div>
}
