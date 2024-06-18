import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/store";
import { setPaymentChoose } from "@/store/paymentSlice";

const PaymentMethod = () => {
  const dispatch = useAppDispatch();
  const choose = useAppSelector((state) => state.payment.choose);

  const changeValue = (str: string, key: 'card_cvn' | 'card_account_number' | 'card_exp_month' | 'card_exp_year' | 'customer_id') => {
    const nominal = str?.replace(/[^0-9]/g, '')

    var pattern = /^\d+\.?\d*$/;
    if (pattern.test(nominal) &&
      (
        ((key == 'card_account_number' || key == 'card_cvn' || key == 'customer_id') && nominal.length <= 20) ||
        (key == 'card_exp_year' && nominal.length <= 4) ||
        (key == 'card_exp_month' && nominal.length <= 2 && nominal != '00' && Number(nominal) <= 12)
      )
    ) {
      dispatch(setPaymentChoose({ ...choose, [key]: nominal }))
    }
    if (nominal.length == 0) {
      dispatch(setPaymentChoose({ ...choose, [key]: '' }))
    }
  }

  return <>
    <div className='p-[15px] bg-[#fff]'>
      <div className={`flex flex-row justify-between ${choose?.id ? 'mb-[15px]' : ''}`}>
        <div className="text-[16px] font-medium text-[#000]">Metode Pembayaran</div>
        <Link href="/checkout/method-payment">
          <div className="text-[16px] font-medium text-[#F7B500] cursor-pointer">{choose?.id ? 'Ubah' : 'Pilih'}</div>
        </Link>
      </div>
      {choose?.id && <div className='flex gap-[10px] items-center'>
        {choose.icon_url && <img
          src={choose.icon_url}
          className="w-[60px] h-[30px] mr-[10px] object-contain"
          alt={choose.name} />}
        <div>
          <div className="text-[14px] font-bold text-[#1A1B1E]">{choose.type}</div>
          <div className="text-[12px] text-[#1A1B1E] mb-[10px]">{choose.name}</div>
          {/* <div className="text-[16px] font-medium text-[#F7B500]">Rp{parsingCurrencyRupiah('2000000')}</div> */}
        </div>
      </div>}
    </div>
    {choose?.type_code == 'card' && <div className='p-[15px] bg-[#fff]'>
      Kartu Akun Number
      <input
        className="border-[#C8C7B7] border rounded-[8px] p-[8px] px-[12px] text-[#1D2129] text-[20px] font-semibold my-[10px] w-full focus:border-[#F7B500] focus:outline-none"
        value={choose?.card_account_number}
        onChange={(e) => changeValue(e.target.value, 'card_account_number')} />
      Kartu CVN
      <input
        className="border-[#C8C7B7] border rounded-[8px] p-[8px] px-[12px] text-[#1D2129] text-[20px] font-semibold my-[10px] w-full focus:border-[#F7B500] focus:outline-none"
        value={choose?.card_cvn}
        onChange={(e) => changeValue(e.target.value, 'card_cvn')} />
      <div className="flex justify-between gap-[10px]">
        <div>
          Tahun
          <input
            className="border-[#C8C7B7] border rounded-[8px] p-[8px] px-[12px] text-[#1D2129] text-[20px] font-semibold my-[10px] w-full focus:border-[#F7B500] focus:outline-none"
            value={choose?.card_exp_year}
            onChange={(e) => changeValue(e.target.value, 'card_exp_year')} />
        </div>
        <div>
          Bulan
          <input
            className="border-[#C8C7B7] border rounded-[8px] p-[8px] px-[12px] text-[#1D2129] text-[20px] font-semibold my-[10px] w-full focus:border-[#F7B500] focus:outline-none"
            value={choose?.card_exp_month}
            onChange={(e) => changeValue(e.target.value, 'card_exp_month')} />
        </div>
      </div>
    </div>}
    {choose?.type_code == 'emoney' && <div className='p-[15px] bg-[#fff]'>
      ID Pelanggan
      <input
        className="border-[#C8C7B7] border rounded-[8px] p-[8px] px-[12px] text-[#1D2129] text-[20px] font-semibold my-[10px] w-full focus:border-[#F7B500] focus:outline-none"
        value={choose?.customer_id}
        onChange={(e) => changeValue(e.target.value, 'customer_id')} />
    </div>}
  </>
}

export default PaymentMethod