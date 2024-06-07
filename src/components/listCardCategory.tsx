import { useAppDispatch } from "@/store";
import { ICategory, getListProgram } from "@/store/programSlice"
import { memo, useState } from "react"


const ListCardCategory = memo(({ data, loading }: { data: ICategory[], loading?: boolean }) => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState(0)

  return <div className="flex p-[15px] gap-[10px] overflow-auto text-[12px] no-scrollbar">
    {loading ?
      [1, 2, 3, 4, 5].map(item => <div key={item} className="animate-pulse">
        <div className="bg-slate-400 p-[15px] rounded-[10px] h-[45px] w-[100px]" />
      </div>)
      :
      ([{ name: 'Semua', id: 0 }]).concat(data || []).map((value) => <div
        key={value.id + value.name}
        onClick={() => {
          setCategory(value.id)
          dispatch(getListProgram({ page: 1, limit: 20, category: value.id }))
        }}
        className={`${category == value.id ? 'bg-[#F7B500] text-[#2A1700] font-semibold' : 'bg-[#F4F3F7] text-[#47483B]'} cursor-pointer p-[15px] rounded-[10px] whitespace-nowrap`}>{value.name}</div>)
    }
  </div>
})

ListCardCategory.displayName = 'ListCardCategory';

export default ListCardCategory