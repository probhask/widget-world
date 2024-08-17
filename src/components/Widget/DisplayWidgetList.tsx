import React, { useEffect, useState } from "react";
import useWidgetAppContext from "../../context/WidgetAppContext";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { RiEyeOffLine, RiEyeLine } from "react-icons/ri";
import { WIDGET } from "../../types";

type Props = {
  widgetList: WIDGET[];
  isSearch?: boolean;
};
const DisplayWidgetList = React.memo(({ widgetList, isSearch }: Props) => {
  const { toggleHideUnHide, deleteWidget, deleteCategory } =
    useWidgetAppContext();
  const [expandArray, setExpandArray] = useState<string[]>([]);

  const toggleExpand = (categoryID: string) => {
    if (expandArray.includes(categoryID)) {
      setExpandArray((prev) => prev.filter((id) => id !== categoryID));
    } else {
      setExpandArray((prev) => [...prev, categoryID]);
    }
  };
  useEffect(() => {
    if (isSearch) {
      const list = widgetList.map((item) => item.categoryId);
      setExpandArray(list);
    }
  }, [isSearch]);
  return (
    <div className="flex flex-col items-center w-full gap-1">
      {widgetList?.map((widget) => (
        <div
          key={widget.categoryId}
          className={`w-full  ${expandArray.includes(widget.categoryId) && "mb-2"}`}
        >
          <div
            className="flex items-center justify-between bg-[#674188] text-[#F7EFE5] text p-2 cursor-pointer"
            onClick={() => toggleExpand(widget.categoryId)}
          >
            <div className="flex gap-2 items-center justify-between w-full">
              <h5>{widget.category}</h5>
              <span className="size-5 rounded-full flex justify-center items-center font-semibold bg-[#C8A1E0] text-[#671488]">
                {widget.data.length}
              </span>
            </div>
            <div className="flex items-center ml-3">
              <span
                className="text-[#C8A1E0] text-xl active:scale-90 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCategory(widget.categoryId);
                }}
              >
                {" "}
                <IoMdTrash />
              </span>
              {!isSearch && (
                <span className="flex items-center  px-2 py-1">
                  {expandArray.includes(widget.categoryId) ? (
                    <FaAngleUp title="collapse" />
                  ) : (
                    <FaAngleDown title="expand" />
                  )}
                </span>
              )}
            </div>
          </div>
          {(isSearch || expandArray.includes(widget.categoryId)) && (
            <ul className="bg-[#C8A1E0]">
              {widget.data.map((item) => (
                <li
                  className="flex items-center justify-between px-3 py-1 border-b-2 border-gray-100"
                  key={item.id}
                >
                  <span>{item.title}</span>
                  <div className="flex items-center gap-3 text-xl">
                    <span
                      className="cursor-pointer active:scale-90 transition-all text-[#F7EFE5]"
                      onClick={() => toggleHideUnHide(item.id)}
                    >
                      {!item.hide ? (
                        <RiEyeOffLine title="hide" />
                      ) : (
                        <RiEyeLine title="show" />
                      )}
                    </span>
                    <span
                      title="remove"
                      className="cursor-pointer active:scale-90 transition-all"
                      onClick={() => deleteWidget(item.id)}
                    >
                      <IoMdTrash className="text-[#671488]" />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
});

DisplayWidgetList.displayName = "DisplayWidgetList";

export default DisplayWidgetList;
