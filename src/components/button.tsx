
type Prop = {
  title: string,
  type?: 'warning' | 'black'
}

const Button = ({ title, type }: Prop) => {

  return <div
    className={`${type == 'warning' ? ' bg-[#F7B500] border-[#F7B500] hover:text-white' : (type == 'black' ? ' bg-[#231F20] border-[#231F20] text-[#FBB12F]' : ' hover:border-[#F7B500] hover:text-[#F7B500]')} border-[#787869] border rounded-[8px] h-[48px] flex justify-center items-center text-[#2A1700] text-[14px] font-semibold cursor-pointer`}>
    {title}
  </div>;
};

export default Button;
