
'use client'
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

import Header from "@/components/header";
import Title from '@/components/title';
import ListDonasi from '@/components/listDonasi';

import { useAppDispatch, useAppSelector } from '@/store';
import { getListProgram, getListProgramCategories } from '@/store/programSlice';
import ListCardCategory from '@/components/listCardCategory';

export default function Produk() {
  const dataList = useAppSelector((state) => state.program.dataList);
  const loadingList = useAppSelector((state) => state.program.loadingList);
  const dataListCategory = useAppSelector((state) => state.program.dataListCategory);
  const loadingListCategory = useAppSelector((state) => state.program.loadingListCategory);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const getList = useCallback(() => {
    if (!loadingList) {
      dispatch(getListProgram({ page: 1, limit: 20 }))
      dispatch(getListProgramCategories())
    }
  }, [dispatch, loadingList])

  useEffect(() => {
    getList()
  }, [])

  return <div className='bg-white'>
    <Header title="Donasi" backAction={() => router.back()} bottomComponent={<ListCardCategory data={dataListCategory?.items || []} loading={loadingListCategory} />} />
    <Title title='Semua Donasi' />
    <ListDonasi data={dataList?.items || []} loading={loadingList} />
  </div>
}
