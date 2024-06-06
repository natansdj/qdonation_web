import { ICategory } from "@/store/programSlice"
import { memo, useState } from "react"


const ListCardCategory = memo(({ data }: { data: ICategory[] }) => {
  const [category, setCategory] = useState(0)
  return <div className="flex p-[15px] gap-[10px] overflow-auto text-[12px] no-scrollbar">
    {([{ name: 'Semua', id: 0 }]).concat(data || []).map((value) => <div
      key={value.id + value.name}
      onClick={() => setCategory(value.id)}
      className={`${category == value.id ? 'bg-[#F7B500] text-[#2A1700] font-semibold' : 'bg-[#F4F3F7] text-[#47483B]'} cursor-pointer p-[15px] rounded-[10px] whitespace-nowrap`}>{value.name}</div>)}
  </div>
}, (prevProps, nextProps) => {
  if (JSON.stringify(prevProps.data) == JSON.stringify(nextProps.data)) {
    return true;
  }
  return false;
})

ListCardCategory.displayName = 'ListCardCategory';

export default ListCardCategory