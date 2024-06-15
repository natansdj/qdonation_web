'use client'
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/button';
import Header from '@/components/header';
import PaymentMethod from '@/components/paymentMethod';
import CardDonationAmount from '@/components/cardDonationAmount';

import images from '@/configs/images';

import { parsingCurrencyRupiah } from '@/utils/Helpers';
import { useAppDispatch, useAppSelector } from '@/store';
import { getPaymentList, prosesPayment } from '@/store/paymentSlice';

import Alert, { alertProp } from '@/components/alert';

let timeout: any
export default function Detail() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector((state) => state.payment.dataList);
  const choose = useAppSelector((state) => state.payment.choose);
  const value = useAppSelector((state) => state.payment.value);
  const paymentResponse = useAppSelector((state) => state.payment.paymentResponse);
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const router = useRouter()
  const [alert, setAlert] = useState<alertProp>()

  useEffect(() => {
    if (paymentResponse?.donation_id && paymentResponse?.payment_info?.donation_payment_id) {
      router.push(`/status?donation_id=${paymentResponse?.donation_id}&payment_id=${paymentResponse?.payment_info?.donation_payment_id}`)
    }
  }, [paymentResponse])

  useEffect(() => {
    if (!dataList?.items?.length) {
      dispatch(getPaymentList())
    }
  }, [])

  const payment = () => {
    if (choose?.id && choose?.channel_id && id && value) {
      dispatch(prosesPayment({
        id,
        data: {
          amount: value,
          payment_channel_id: choose.channel_id,
          payment_method_id: choose.id
        }
      }))
    } else {
      setAlert({
        type: 'warning',
        header: 'Checkout',
        description: `Mohon pilih tipe pembayaran dan isi nominal donasi`,
      })
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setAlert({})
      }, 3000);
    }
  }

  return <div className='flex flex-col justify-between relative'>
    <div className=''>
      <Header title='Checkout' backAction={() => router.back()} />
      <div className='flex flex-col gap-[10px]'>
        <div className='p-[15px] bg-[#fff]'>
          <div className='text-[18px] font-medium text-[#1A1B1E] mb-[15px]'>Rincian Donasi</div>
          <div className='flex items-center gap-[10px]'>
            <Image className='w-[40px] h-[40px]' src={images.donation} alt='' />
            <div className='text-[16px] font-medium text-[#000]'>Bantu Pasien Rumah Sakit #DanaBerobat</div>
          </div>
        </div>
        <CardDonationAmount />
        {!!value && <PaymentMethod />}
      </div>
      <div className='footer-button'>
        <div className='p-[15px] bg-white flex justify-between items-center border-[#E5E6EB] border-t'>
          <div>
            <div className='text-[12px] text-[#1A1B1E] font-medium mb-[5px]'>Total Bayar</div>
            <div className='text-[20px] text-[#1A1B1E] font-medium'>Rp{parsingCurrencyRupiah(`${value || 0}`)}</div>
          </div>
          <div onClick={payment} className='min-w-[180px]'><Button title='Bayar Sekarang' type='warning' /></div>
        </div>
      </div>
    </div>

    {alert?.header && <Alert {...alert} />}
  </div>
}