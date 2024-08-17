import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoRemoveCircle } from "react-icons/io5";
import useWidgetAppContext from "../../context/WidgetAppContext";

const WidgetList = React.memo(() => {
  const { widgetList, toggleHideUnHide } = useWidgetAppContext();
  return (
    <div className="flex justify-center gap-y-8 flex-col w-full h-full mt-10 px-2">
      {widgetList?.map(
        (item, index) =>
          item.data.length > 0 &&
          item.data.some((item) => item.hide === false) && (
            <div
              key={index + item.category}
              className={` px-5 py-3 pb-8 bg-[#E2BFD9] rounded-lg shadow-custom `}
            >
              <h3 className="text-lg font-semibold  bg-[#C8A1E0] text-[#674188] border-2 border-[#674188]  w-fit py-0.5 px-3 rounded-md mb-3 uppercase">
                {item.category}
              </h3>
              <div className="flex items-center gap-3 flex-wrap ">
                {item?.data?.map(
                  (item) =>
                    !item?.hide && (
                      <div
                        className="relative px-4 py-2 border  border-[#674188]  bg-[#C8A1E0] rounded-md shadow-sm "
                        key={item?.id}
                      >
                        <h6 className="font-bold text mb-1 ">{item?.title}</h6>
                        <p className="py-1 h-[150px] w-[250px] flex justify-center items-center text-justify text-clip line-clamp-5 text-sm text-[#674188] font-medium">
                          {item?.info}
                        </p>
                        <span
                          className="flex justify-center items-center absolute top-2 right-1 text-[#674188] text-2xl active:scale-90 cursor-pointer"
                          onClick={() => toggleHideUnHide(item?.id)}
                          title="hide"
                        >
                          <IoRemoveCircle />
                        </span>
                      </div>
                    )
                )}
              </div>
            </div>
          )
      )}
      {widgetList.length === 0 &&
        !widgetList.some((widget) =>
          widget.data.some((item) => item.hide === false)
        ) && (
          <div className="w-full h-full flex flex-col items-center mt-20 gap-y-2 text-neutral-600">
            <h4 className="uppercase text-2xl font-semibold text-center">
              add some widget from store
            </h4>
            <h6 className="flex items-center gap-y-0.5 gap-x-2 text-lg flex-wrap justify-center">
              Click <AiOutlinePlusCircle className="text-green-700 text-2xl" />{" "}
              icon at the top-right corner
            </h6>
          </div>
        )}
    </div>
  );
});

WidgetList.displayName = "WidgetList";

export default WidgetList;
