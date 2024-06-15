
export type alertProp = {
  header?: string | React.ReactNode,
  description?: string | React.ReactNode,
  type?: 'warning' | 'danger' | string
}

const Alert = ({ header, description, type }: alertProp) => {

  return <div className="absolute z-[9999999] top-[20px] left-0 right-0 flex justify-center">
    <div
      className={`bg-white text-[#2A1700] border ${type == 'warning' ? ` bg-[#fff3cd!important] border-[#ffeeba!important] text-[#856404!important]` : (type == 'danger' ? ` bg-[#f8d7da!important] border-[#f5c6cb!important] text-[#721c24!important]` : ` `)} rounded-[8px] text-center text-[14px] font-semibold px-[15px] py-[5px]`}>
      <div>{header}</div>
      <div className="mt-[5px] text-[12px]">{description}</div>
    </div>
  </div>
};

export default Alert;
