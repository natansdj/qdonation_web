import Image from "next/image";
import images from "@/configs/images";

type Prop = {
  title?: string,
  transparent?: boolean,
  backAction?: () => void,
  typeIcon?: 'arrow' | 'close'
  bottomComponent?: React.ReactNode
};

const Header = ({ title, transparent, backAction, bottomComponent, typeIcon }: Prop) => {
  let iconLeft = images.backArrow
  if (typeIcon == 'close') {
    iconLeft = images.close
  }
  return <div className={`border-b-[#E1E1E6] ${transparent ? ' bg-transparent' : 'border-b bg-white'}`}>
    <div className="flex justify-between items-center p-[15px] h-[60px]">
      <div className="w-[24px]">{backAction && <Image onClick={backAction} src={iconLeft} alt="" className="w-[24px] h-[24px] cursor-pointer" />}</div>
      <div className="text-[20px] text-[#1A1B1E]">{title || ''}</div>
      <div className="w-[24px]"></div>
    </div>
    {bottomComponent}
  </div>
}

export default Header