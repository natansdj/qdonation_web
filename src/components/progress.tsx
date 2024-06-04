const Progress = ({ percent }: { percent: number }) => {
  return <div className="relative">
    <div className="h-[3px] rounded-[3px] bg-[#D9D9D9] w-full" />
    <div className="h-[3px] rounded-[3px] bg-[#F7B500] absolute top-0 left-0 bottom-0" style={{ width: `${percent}%` }} />
  </div>;
};

export default Progress;