import Image from "next/image"

const CardImage = ({ url, category }: { url: string, category: string }) => {
  return <div className="relative min-h-[200px] w-full bg-slate-400">
    <Image
      src={url}
      alt=""
      width="0"
      height="0"
      sizes="100vw"
      className="w-full h-auto"
      priority
    />
    <span className="absolute top-[15px] left-[15px] bg-[#F6DB9F] rounded-[5px] p-[4px] px-[12px] text-[#1A1B1E] text-[10px]">{category}</span>
  </div>
}

export default CardImage