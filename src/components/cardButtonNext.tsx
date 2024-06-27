import { parsingCurrencyRupiah } from "@/utils/Helpers";
import Button from "./button";
import { useAppSelector } from "@/store";

type Prop = {
  onSubmit: () => void,
  onClose: () => void
}

const CardButtonNext = ({ onClose, onSubmit }: Prop) => {
  const dataList = useAppSelector((state) => state.payment.dataList);
  const value = useAppSelector((state) => state.payment.value);

  const inside = (e: any) => {
    e.stopPropagation();
  }

  return <div className="bg-[rgba(17,17,17,0.5)] absolute top-0 left-0 right-0 bottom-0 min-h-[100vh] z-[5] flex flex-col justify-end" onClick={onClose}>
    <div className="bg-white p-[15px] pt-[8px] rounded-tl-[24px] rounded-tr-[24px]" onClick={inside}>
      <div className="flex items-center justify-center pb-[20px]">
        <div onClick={onClose} className="bg-[#C9CDD4] h-[4px] w-[20%] cursor-pointer rounded-full" />
      </div>
      <div className="flex flex-col gap-[10px] mb-[20px]">
        <div className="text-[#1A1B1E] text-[20px] font-medium pb-[10px]">Ringkasan Transaksi</div>
        <div className="flex flex-row justify-between text-[16px] text-[#47483B]">
          <div>Nominal Donasi</div>
          <div className="text-[#1D2129] font-medium">Rp{parsingCurrencyRupiah(`${value || 0}`)}</div>
        </div>
        <div className="flex flex-row justify-between text-[16px] text-[#47483B]">
          <div>Biaya admin</div>
          <div className="text-[#1D2129] font-medium">Rp{parsingCurrencyRupiah(`${dataList?.admin_fee || 0}`)}</div>
        </div>
        <div className="flex flex-row justify-between text-[16px] text-[#1D2129] border-[#C9CDD4] border-dotted border-t-2 pt-[10px]">
          <div>Total</div>
          <div className="font-medium">Rp{parsingCurrencyRupiah(`${Number(value || 0) + Number(dataList?.admin_fee || 0)}`)}</div>
        </div>
      </div>
      <div onClick={(e: any) => {
        e.stopPropagation();
        onSubmit?.()
      }} >
        <Button title="Lanjutkan" type="warning" />
      </div>
    </div>
  </div>;
};

export default CardButtonNext;
