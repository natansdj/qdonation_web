import { useState } from "react";
import Image from "next/image";

import images from "@/configs/images";

type Prop = {
  title: any, children: React.ReactNode
}

const AccordionPayment = ({ title, children }: Prop) => {
  const [show, setShow] = useState(false)

  return <div>
    <div onClick={() => setShow(!show)} className="cursor-pointer bg-[#fff] py-[15px] text-[#171D29] flex justify-between items-center">
      <div>{title}</div>
      <Image className={`h-[24px] w-[24px] ${show ? 'rotate-180' : 'rotate-90'}`} src={images.arrowTop} alt="" />
    </div>
    {show && <>{children}</>}
  </div>;
};

export default AccordionPayment;
