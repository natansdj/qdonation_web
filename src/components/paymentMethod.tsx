import images from "@/configs/images";
import { parsingCurrencyRupiah } from "@/utils/Helpers";
import Image from "next/image";
import Header from "./header";
import { useState } from "react";
import Checkbox from "./checkbox";
import AccordionPayment from "./accordionPayment";

type Prop = {
  title?: string,
  transparent?: boolean,
  backAction?: () => void,
  bottomComponent?: React.ReactNode
};

const PaymentMethod = ({ title, transparent, backAction, bottomComponent }: Prop) => {
  const [modal, setModal] = useState(false)
  const [select, setSelect] = useState('')

  return <>
    <div className='p-[15px] bg-[#fff]'>
      <div className="flex flex-row justify-between mb-[15px]">
        <div className="text-[16px] font-medium text-[#000]">Metode Pembayaran</div>
        <div className="text-[16px] font-medium text-[#F7B500] cursor-pointer" onClick={() => setModal(true)}>Ubah</div>
      </div>
      <div className='flex gap-[10px] items-center'>
        <Image className='w-[40px] h-[40px]' src={images.donation} alt='' />
        <div>
          <div className="text-[14px] font-medium text-[#1A1B1E]">QoinCash</div>
          <div className="text-[16px] font-medium text-[#F7B500]">Rp{parsingCurrencyRupiah('1000000')}</div>
        </div>
      </div>
    </div>
    {modal && <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#F5F5F5] flex flex-col justify-between">
      <div className='overflow-auto h-full no-scrollbar'>
        <Header title='Metode Pembayaran' backAction={() => setModal(false)} />
        <div className="p-[15px] flex flex-col gap-[10px]">
          <div>
            <div className="text-[16px] font-medium text-[#1A1B1E] mb-[5px]">Bagaimana kamu melakukan pembayaran</div>
            <div className="text-[14px] text-[#636770]">Tersedia banyak pilihan mudah untuk melakukan pembayaran</div>
          </div>
          <div className='bg-white rounded-[8px] p-[15px]'>
            <div className="text-[16px] font-medium text-[#000] mb-[15px]">QoinCash</div>
            <div className="flex flex-row justify-between cursor-pointer" onClick={() => setSelect('coin' == select ? '' : 'coin')}>
              <div className="flex gap-[10px] items-center">
                <Image className='w-[40px] h-[40px]' src={images.donation} alt='' />
                <div>
                  <div className="text-[14px] font-medium text-[#1A1B1E]">QoinCash</div>
                  <div className="text-[16px] font-medium text-[#F7B500]">Rp{parsingCurrencyRupiah('1000000')}</div>
                </div>
              </div>
              <Checkbox checked={select == 'coin'} />
            </div>
          </div>
          <div className='bg-white rounded-[8px] p-[15px]'>
            <div className="text-[16px] font-medium text-[#000]">Kartu Debit</div>
            <AccordionPayment title={<Image src={images.card} alt="" className="w-[30px]" />} >
              {['BCA', 'Mandiri', 'BNI'].map(item => <div key={item} onClick={() => setSelect(item == select ? '' : item)} className="border-b border-b-[#DEDEDE] last:border-b-0 py-[10px] flex justify-between">
                <div className="text-[14px] text-[#1A1B1E]">{item}</div>
                <Checkbox checked={select == item} />
              </div>)}
            </AccordionPayment>
          </div>
          <div className='bg-white rounded-[8px] p-[15px]'>
            <div className="text-[16px] font-medium text-[#000]">Transfer lewat bank</div>
            <AccordionPayment title="Bank AGI" >
              {['Bank BCA', 'Bank Mandiri', 'Bank BNI'].map(item => <div key={item} onClick={() => setSelect(item == select ? '' : item)} className="border-b border-b-[#DEDEDE] last:border-b-0 py-[10px] flex justify-between">
                <div className="text-[14px] text-[#1A1B1E]">{item}</div>
                <Checkbox checked={select == item} />
              </div>)}
            </AccordionPayment>
            <AccordionPayment title="Bank Permata" >
              {['Bank BCA', 'Bank Mandiri', 'Bank BNI'].map(item => <div key={item} onClick={() => setSelect(item == select ? '' : item)} className="border-b border-b-[#DEDEDE] last:border-b-0 py-[10px] flex justify-between">
                <div className="text-[14px] text-[#1A1B1E]">{item}</div>
                <Checkbox checked={select == item} />
              </div>)}
            </AccordionPayment>
            <AccordionPayment title="Bank BRI" >
              {['Bank BCA', 'Bank Mandiri', 'Bank BNI'].map(item => <div key={item} onClick={() => setSelect(item == select ? '' : item)} className="border-b border-b-[#DEDEDE] last:border-b-0 py-[10px] flex justify-between">
                <div className="text-[14px] text-[#1A1B1E]">{item}</div>
                <Checkbox checked={select == item} />
              </div>)}
            </AccordionPayment>
            <AccordionPayment title="Bank BNI" >
              {['Bank BCA', 'Bank Mandiri', 'Bank BNI'].map(item => <div key={item} onClick={() => setSelect(item == select ? '' : item)} className="border-b border-b-[#DEDEDE] last:border-b-0 py-[10px] flex justify-between">
                <div className="text-[14px] text-[#1A1B1E]">{item}</div>
                <Checkbox checked={select == item} />
              </div>)}
            </AccordionPayment>
          </div>
          <div className='bg-white rounded-[8px] p-[15px]'>
            <div className="text-[16px] font-medium text-[#000]">Pembayaran Lainnya</div>
            <AccordionPayment title="Loyalty Points" >
              {['Styles', 'MAP Club', 'MyPertamina Points', 'Telkomsel Points'].map(item => <div key={item} onClick={() => setSelect(item == select ? '' : item)} className="border-b border-b-[#DEDEDE] last:border-b-0 py-[10px] flex justify-between">
                <div className="text-[14px] text-[#1A1B1E]">{item}</div>
                <Checkbox checked={select == item} />
              </div>)}
            </AccordionPayment>
          </div>
        </div>
      </div>
    </div>}
  </>
}

export default PaymentMethod