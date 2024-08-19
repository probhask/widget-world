import { WIDGET_ITEM } from "types/index";
import React from "react";
import { IoRemoveCircle } from "react-icons/io5";

type Props = {
  item: WIDGET_ITEM;
  toggleHideUnHide: (widgetId: string) => void;
};
const WidgetCard = React.memo(({ item, toggleHideUnHide }: Props) => {
  return (
    <div
      className="relative px-4 py-2 border  border-[#674188]  bg-[#C8A1E0] rounded-md shadow-sm  w-full"
      key={item?.id}
    >
      <h6 className="font-bold text mb-1 ">{item?.title}</h6>
      <p className="py-1 h-[150px] w-full flex justify-center items-center text-justify text-clip line-clamp-5 text-sm text-[#674188] font-medium">
        {item?.info}
      </p>
      <span
        className="flex justify-center items-center absolute top-2 right-1 text-[#674188] text-2xl active:scale-90 cursor-pointer"
        onClick={() => toggleHideUnHide(item.id)}
        title="hide"
      >
        <IoRemoveCircle />
      </span>
    </div>
  );
});

WidgetCard.displayName = "WidgetCard";

export default WidgetCard;
