import { useEffect, useState } from "react";
import Image from "next/image";

import images from "@/configs/images";

type Prop = {
  title: string | React.ReactNode, children: React.ReactNode, defaultShow?: boolean, iconDown?: boolean
}

const Accordion = ({ title, children, defaultShow = false, iconDown = false }: Prop) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (defaultShow) {
      setShow(defaultShow)
    }
  }, [])

  return <div>
    <div onClick={() => setShow(!show)} className="cursor-pointer bg-[#fff] p-[15px] text-[#171D29] flex justify-between items-center">
      <div>{title}</div>
      <Image className={`h-[24px] w-[24px] ${show ? (iconDown ? 'rotate-0' : 'rotate-180') : (iconDown ? 'rotate-180' : 'rotate-0')}`} src={images.arrowTop} alt="" />
    </div>
    {show && <>{children}</>}
  </div>;
};

export default Accordion;
