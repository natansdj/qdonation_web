'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

import Header from '@/components/header';
import Progress from '@/components/progress';
import Accordion from '@/components/accordion';
import Button from '@/components/button';

import { parsingCurrencyRupiah } from '@/utils/Helpers';
import { useAppDispatch, useAppSelector } from '@/store';
import { useCallback, useEffect } from 'react';
import { getListProgramDetail } from '@/store/programSlice';
import CardImage from '@/components/cardImage';
import moment from 'moment';

export default function Detail({ params }: { params: { id: string } }) {
  const loadingDetail = useAppSelector((state) => state.program.loadingDetail);
  const dataDetail = useAppSelector((state) => state.program.dataDetail);
  const dispatch = useAppDispatch();
  const router = useRouter()

  const getDetail = useCallback(() => {
    if (!loadingDetail && params.id) {
      dispatch(getListProgramDetail(params.id))
    }
  }, [dispatch, loadingDetail, params.id])

  useEffect(() => {
    getDetail()
  }, [])

  return <div className='bg-[#F5F5F5] h-[100vh] flex flex-col justify-between'>
    <div className='overflow-auto h-full no-scrollbar'>
      <Header backAction={() => router.back()} />
      <div>
        {(!loadingDetail && dataDetail?.data) ?
          <CardImage url={dataDetail?.data.program_images?.[0]} category={dataDetail?.data?.program_categories?.[0]} />
          :
          <div className='animate-pulse'>
            <div className='bg-slate-400 h-[288px] w-full'></div>
          </div>}
        <div className='p-[15px] bg-[#fff]'>
          {(!loadingDetail && dataDetail?.data) ?
            <div className='text-[16px] font-medium text-[#000] mb-[15px]'>{dataDetail?.data?.name}</div>
            :
            <div className='animate-pulse mb-[15px]'>
              <div className='bg-slate-400 h-[20px] w-[100px] rounded' />
            </div>}
          {loadingDetail ?
            <div className='animate-pulse flex gap-[10px] mb-[15px]'>
              <div className='bg-slate-400 h-[20px] w-[100px] rounded' />
              <div className='bg-slate-400 h-[20px] w-[100px] rounded' />
            </div>
            :
            <div className='flex gap-[10px] mb-[15px]'>
              <div className='text-[#F7B500] text-[16px] font-medium'>Rp{parsingCurrencyRupiah(`${dataDetail?.data?.donation_sum}`)}</div>
              <div className='text-[#111111] text-[14px]'>Rp{parsingCurrencyRupiah(`${dataDetail?.data?.has_target}`)}</div>
            </div>}
          {loadingDetail ?
            <div className='animate-pulse'>
              <div className='bg-slate-400 h-[3px] w-full rounded' />
            </div>
            :
            <Progress percent={dataDetail?.data?.current_progress || 0} />}
          {loadingDetail ?
            <div className='animate-pulse mt-[15px]'>
              <div className='bg-slate-400 h-[20px] w-[100px] rounded' />
            </div>
            :
            <div className='text-[#111111] text-[14px] mt-[15px]'>{dataDetail?.data?.donation_count} Donasi</div>}
          {loadingDetail ?
            <div className='animate-pulse mt-[15px]'>
              <div className='bg-slate-400 h-[20px] w-full rounded' />
            </div>
            :
            <div className='text-[#111111] text-[14px] mt-[15px]'>{dataDetail?.data?.description}</div>}
          <div className='text-[#76767A] text-[13px] mt-[15px] pt-[15px] border-t-[#EDEDED] border-t-[2px] border-dashed'>
            {loadingDetail ?
              <div className='animate-pulse mt-[15px]'>
                <div className='bg-slate-400 h-[20px] w-[150px] rounded' />
              </div>
              :
              <div>Berlaku sampai {moment(dataDetail?.data?.period_end_date).format('DD MMM YYYY')}</div>}
          </div>
        </div>
        <div className='flex flex-col gap-[10px] mt-[10px]'>
          {dataDetail?.data?.program_info?.map?.((item) => <Accordion key={item.name} title={item.name}><div className='p-[15px] bg-white border-t-[#F5F5F5] border-t-[2px]'>{item.description}</div></Accordion>)}
        </div>
      </div>
      <div className='footer-button'>
        <div className='p-[15px] bg-white border-[#E5E6EB] border-t'>
          <Link href='/checkout'><Button title='Donasi Sekarang' type='warning' /></Link>
        </div>
      </div>
    </div>
  </div>
}