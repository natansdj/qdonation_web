'use client'

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from '@/store';
import { clearStatusProses, statusPayment, statusType } from '@/store/paymentSlice';

export default function Thanks() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const donation_id = Number(searchParams.get('donation_id') || 0)
  const paymentResponse = useAppSelector((state) => state.payment.paymentResponse);
  const paymentStatus = paymentResponse?.payment_info?.status

  useEffect(() => {
    getStatus()
  }, [])

  const getStatus = () => {
    if (donation_id) {
      dispatch(statusPayment({ donation_id }))
    }
  }

  useEffect(() => {
    if (paymentResponse) {
      const message = JSON.stringify({
        status: 'actionSuccessful',
        data: paymentResponse
      })

      try {
        // @ts-ignore
        if (window.AndroidInterface) {
          // @ts-ignore
          window.AndroidInterface.actionSuccessful(message)
          // @ts-ignore
        } else if (window.ReactNativeWebView) {
          // @ts-ignore
          window.ReactNativeWebView.postMessage(message)
          // @ts-ignore
        } else if (window.flutter_inappwebview) {
          // @ts-ignore
          window.flutter_inappwebview.callHandler(message);
        } else {
          window.parent.postMessage(message)
        }
      } catch { }
    }
  }, [paymentResponse])

  return <div className='bg-white h-screen'>
    <div className='h-full flex justify-center items-center font-bold text-2xl'>
      Thank You
    </div>
  </div>
}
