'use client'
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image';

import Alert from '@/components/alert';
import Button from '@/components/button';
import Header from '@/components/header';
import PaymentMethod from '@/components/paymentMethod';
import CardDonationAmount from '@/components/cardDonationAmount';

import images from '@/configs/images';

import { parsingCurrencyRupiah } from '@/utils/Helpers';

import { useAppDispatch, useAppSelector } from '@/store';
import { getListProgramDetail, setAlertState } from '@/store/programSlice';
import { clearStatusProses, getPaymentList, prosesPayment, setPaymentChoose } from '@/store/paymentSlice';

let timeout: any
export default function Detail() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector((state) => state.payment.dataList);
  const choose = useAppSelector((state) => state.payment.choose);
  const value = useAppSelector((state) => state.payment.value);
  const paymentResponse = useAppSelector((state) => state.payment.paymentResponse);
  const dataDetail = useAppSelector((state) => state.program.dataDetail);
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const router = useRouter()

  useEffect(() => {
    dispatch(clearStatusProses())
    if (id && (!dataDetail?.data?.id || `${dataDetail?.data?.id || 0}` != id)) {
      dispatch(getListProgramDetail(id))
    }
  }, [])

  useEffect(() => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      if (paymentResponse?.donation_id && paymentResponse?.payment_info?.donation_payment_id) {
        router.push(`/status?donation_id=${paymentResponse?.donation_id}&payment_id=${paymentResponse?.payment_info?.donation_payment_id}`)
      }
    }, 1000)
  }, [paymentResponse])

  useEffect(() => {
    if (!dataList?.items?.length) {
      dispatch(getPaymentList())
    }
  }, [])

  const payment = () => {
    if (choose?.id && choose?.method_id && id && value) {
      const data: any = {
        amount: value,
        payment_channel_id: choose.id,
        payment_method_id: choose.method_id
      }
      if (choose.type_code == 'emoney') {
        if (choose.customer_id) {
          data.customer_id = choose.customer_id
        } else {
          return dispatch(setAlertState({
            type: 'warning',
            header: 'Checkout',
            description: `Mohon isi id pelanggan`,
          }))
        }
      }
      if (choose.type_code == 'card') {
        if (choose.card_cvn && choose.card_account_number && choose.card_exp_year && choose.card_exp_month) {
          data.card_cvn = choose.card_cvn
          data.card_account_number = choose.card_account_number
          data.card_exp_month = choose.card_exp_month
          data.card_exp_year = choose.card_exp_year
        } else {
          return dispatch(setAlertState({
            type: 'warning',
            header: 'Checkout',
            description: `Mohon isi form kartu kredit anda`,
          }))
        }
      }
      dispatch(prosesPayment({
        id,
        data
      }))
    } else {
      dispatch(setAlertState({
        type: 'warning',
        header: 'Checkout',
        description: `Mohon pilih tipe pembayaran dan isi nominal donasi`,
      }))
    }
  }

  return <div className='flex flex-col justify-between relative'>
    <div className=''>
      <Header title='Checkout' backAction={() => {
        dispatch(setPaymentChoose({}))
        router.back()
      }} />
      <div className='flex flex-col gap-[10px]'>
        <div className='p-[15px] bg-[#fff]'>
          <div className='text-[18px] font-medium text-[#1A1B1E] mb-[15px]'>Rincian Donasi</div>
          <div className='flex items-center gap-[10px]'>
            <Image className='w-[40px] h-[40px]' src={images.donation} alt='' />
            <div className='text-[16px] font-medium text-[#000]'>{dataDetail?.data?.name || '-'}</div>
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
    <Alert />
  </div>
}