'use client'
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'

import Alert from '@/components/alert';
import Button from '@/components/button';
import CardInstruction from '@/components/cardInstruction';

import images from '@/configs/images';

import { useAppDispatch, useAppSelector } from '@/store';
import { clearStatusProses, statusPayment, statusType } from '@/store/paymentSlice';

export default function Instruction() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams()
  const donation_id = Number(searchParams.get('donation_id') || 0)
  const donation_payment_id = Number(searchParams.get('payment_id') || 0)
  const paymentResponse = useAppSelector((state) => state.payment.paymentResponse);
  const paymentStatus = paymentResponse?.payment_info?.status
  const router = useRouter()

  useEffect(() => {
    getStatus()
  }, [])

  const getStatus = () => {
    if (donation_id && donation_payment_id) {
      dispatch(statusPayment({ donation_id, data: { donation_payment_id } }))
    }
  }

  // dalam proses=0
  // menunggu pembayaran=1|4
  // gagal=3|5|6
  // berhasil=2

  const status = () => {
    let status: statusType = 'progress'
    if (paymentStatus) {
      if ([1, 4].includes(paymentStatus)) {
        status = 'wait_payment'
      }
      if ([3, 5, 6].includes(paymentStatus)) {
        status = 'failed'
      }
      if ([2].includes(paymentStatus)) {
        status = 'success'
      }
    }
    return status
  }

  return <div className={`flex flex-col justify-between`}>
    <div className=''>
      {paymentResponse && <CardInstruction data={{ ...paymentResponse, status: status() }} />}
      <div className={`footer-button ${status() == 'success' && 'h-[140px!important]'}`}>
        <div className={`p-[15px] bg-white flex gap-[15px] border-[#E5E6EB] border-t ${status() == 'success' && 'flex-col h-[140px!important]'}`}>
          <Link className='w-full' href='/'><Button hover={status() != 'success'} title={status() == 'success' ? <div className='flex flex-row gap-[5px]'>Bagikan <Image src={images.share} alt='' className='w-[20px] h-[20px]' /></div> : 'Kembali ke Beranda'} /></Link>
          <div className='w-full' onClick={() => status() == 'success' ? router.back() : getStatus()} ><Button title={status() == 'success' ? 'Kembali ke Beranda' : 'Refresh'} type='warning' /></div>
        </div>
      </div>
    </div>
    <Alert />
  </div>
}