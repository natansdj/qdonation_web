import Image from "next/image"
import images from "@/configs/images"

type Prop = {
  checked: boolean,
  onClick?: () => void
}

const Checkbox = ({ checked, onClick }: Prop) => {
  return <Image onClick={() => onClick?.()} src={checked ? images.radioOn : images.radio} alt="" className="w-[20px] h-[20px] cursor-pointer" />;
};

export default Checkbox;
