import React, { useMemo } from "react";
import useWidgetAppContext from "../../context/WidgetAppContext";
import DisplayWidgetList from "./DisplayWidgetList";

const ExistingWidget = React.memo(() => {
  const { widgetList } = useWidgetAppContext();

  const totalCategories = useMemo(() => {
    return widgetList.length;
  }, [widgetList]);
  const totalWidget = useMemo(() => {
    let count = 0;
    widgetList.map((widgetCategory) => widgetCategory.data.map(() => count++));
    return count;
  }, [widgetList]);

  return (
    <section className="w-full p-2">
      <div className="flex justify-center items-center w-full my-3 gap-x-4 gap-y-2 flex-wrap text-[#F7EFE5]">
        <div className="bg-[#671488] px-2 py-1 rounded-md ">
          {" "}
          <span className="mr-1">Total Categories: </span>
          <span className="font-bold text-lg">{totalCategories} </span>
        </div>
        <div className="bg-[#671488] px-2 py-1 rounded-md ">
          <span className="mr-1">Total Widgets: </span>
          <span className="font-bold text-lg">{totalWidget} </span>
        </div>
      </div>

      <DisplayWidgetList widgetList={widgetList} />
      {widgetList.length === 0 && (
        <div className="my-5 text-neutral-600 text-lg text-center">
          no category and widget please add
        </div>
      )}
    </section>
  );
});

ExistingWidget.displayName = "ExistingWidget";

export default ExistingWidget;
