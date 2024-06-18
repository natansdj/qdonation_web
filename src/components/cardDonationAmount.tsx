import { memo } from "react";

import { parsingCurrencyRupiah } from "@/utils/Helpers";

import { setPaymentValue } from "@/store/paymentSlice";
import { useAppDispatch, useAppSelector } from "@/store";

const listNominal = [20000, 50000, 100000, 200000, 500000, 1000000]

const CardDonationAmount = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.payment.value);

  const changeValue = (str: string) => {
    const nominal = str?.replace(/[^0-9]/g, '')

    var pattern = /^\d+\.?\d*$/;
    if (pattern.test(nominal) && nominal.length <= 13) {
      dispatch(setPaymentValue({ value: Number(nominal) }))
    }
    if (nominal.length == 0) {
      dispatch(setPaymentValue({ value: 0 }))
    }
  }

  return <div className='p-[15px] bg-[#fff]'>
    <div className="text-[16px] font-medium text-[#000]">Nominal Donasi</div>
    <input
      className="border-[#C8C7B7] border rounded-[8px] p-[8px] text-[#1D2129] text-[20px] font-semibold my-[10px] w-full focus:border-[#F7B500] focus:outline-none"
      value={`Rp${parsingCurrencyRupiah(`${value}`)}`}
      onChange={(e) => changeValue(e.target.value)} />
    <div className="grid grid-cols-3 gap-[10px]">
      {listNominal.map(nom => <div
        key={nom}
        onClick={() => dispatch(setPaymentValue({ value: nom }))}
        className={`cursor-pointer text-[#1D2129] text-[16px] font-medium h-[48px] flex justify-center items-center rounded-[8px] border border-[#E5E6EB]${nom == value ? ' bg-[#F7B500] border-[#F7B500]' : ''}`}>
        {parsingCurrencyRupiah(`${nom}`)}
      </div>)}
    </div>
  </div>
};

export default memo(CardDonationAmount);