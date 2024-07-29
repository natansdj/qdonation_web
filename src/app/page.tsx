
'use client'
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'

import Alert from '@/components/alert';
import Title from '@/components/title';
import Header from "@/components/header";
import ListDonasi from '@/components/listDonasi';
import ListCardCategory from '@/components/listCardCategory';

import { useAppDispatch, useAppSelector } from '@/store';
import { getListProgram, getListProgramCategories } from '@/store/programSlice';
import { setToken } from '@/store/paymentSlice';

export default function Produk() {

  const dataList = useAppSelector((state) => state.program.dataList);
  const loadingList = useAppSelector((state) => state.program.loadingList);
  const dataListCategory = useAppSelector((state) => state.program.dataListCategory);
  const loadingListCategory = useAppSelector((state) => state.program.loadingListCategory);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [more, setMore] = useState(false)

  const searchParams = useSearchParams();
  let token = searchParams.get('token');

  const getList = useCallback(() => {
    if (!loadingList) {
      dispatch(getListProgram({ page: 1, limit: 10 }))
      dispatch(getListProgramCategories())
    }
  }, [dispatch, loadingList])

  const handleScroll = (e: any) => {
    const body = e.srcElement.body;
    if (body.offsetHeight < window.scrollY + window.innerHeight + 50) {
      setMore(true)
    }
  }

  useEffect(() => {
    if (token) {
      token = token?.replace(/\s/g, '+')
      localStorage.setItem('token', token)
      setToken(token)
    } else {
      localStorage.removeItem('token')
      setToken('')
    }
  }, [token])

  useEffect(() => {
    if (!loadingList && dataList.page && dataList.page < dataList.total_page && more) {
      setMore(false)
      dispatch(getListProgram({ page: dataList.page + 1, limit: 10, more: true }))
    }
  }, [loadingList, dataList, more])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    getList()

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return <div className='bg-white'>
    {!token &&  <Header title="Donasi" backAction={() => router.back()} bottomComponent={<ListCardCategory data={dataListCategory?.items || []} loading={loadingListCategory} />} />}
   
    <Title title='Semua Donasi' />
    <ListDonasi data={dataList?.items || []} loading={loadingList} />
    <Alert />
  </div>
}
