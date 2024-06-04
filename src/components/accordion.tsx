import { useState } from "react";
import Image from "next/image";

import images from "@/configs/images";

type Prop = {
  title: string, children: React.ReactNode
}

const Accordion = ({ title, children }: Prop) => {
  const [show, setShow] = useState(false)

  return <div>
    <div onClick={() => setShow(!show)} className="cursor-pointer bg-[#fff] p-[15px] text-[#171D29] flex justify-between items-center">
      <div>{title}</div>
      <Image className={`h-[24px] w-[24px] ${show ? 'rotate-180' : 'rotate-0'}`} src={images.arrowTop} alt="" />
    </div>
    {show && <>{children}</>}
  </div>;
};

export default Accordion;
