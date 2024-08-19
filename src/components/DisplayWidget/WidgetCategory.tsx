import type { WIDGET } from "types/index";
import React from "react";
import WidgetCard from "./WidgetCard";
import useWidgetAppContext from "@context/WidgetAppContext";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";

type Props = {
  item: WIDGET;
};
const WidgetCategory = React.memo(({ item }: Props) => {
  const { toggleHideUnHide } = useWidgetAppContext();

  return (
    <div
      className={` px-5 py-3 pb-8 bg-[#E2BFD9] rounded-lg shadow-custom min-w-[250px]`}
    >
      <div className="w-full flex items-center justify-between gap-2 mb-5 ">
        <h3 className="text-lg font-bold  bg-[#C8A1E0] text-[#674188] border-2 border-[#674188]  w-fit py-0.5 px-3 rounded-md  uppercase text-clip line-clamp-1">
          {item.category}
        </h3>
        <Link
          to={`/store/create-new?category=${item.categoryId}`}
          className="cursor-pointer active:scale-90 transition-all flex items-center text-[#671488] text-3xl"
          title="create-new"
        >
          <IoMdAddCircle />
        </Link>
      </div>
      <div className="flex items-center justify-center sm:justify-start w-full ">
        <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] min-w-[200px] gap-3  w-full ">
          {item?.data?.map(
            (item) =>
              !item?.hide && (
                <WidgetCard
                  key={item.id}
                  item={item}
                  toggleHideUnHide={toggleHideUnHide}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
});

export default WidgetCategory;
