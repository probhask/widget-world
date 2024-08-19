import useWidgetAppContext from "@context/WidgetAppContext";
import React from "react";
import InfoMessage from "./InfoMessage";
import WidgetCategory from "./WidgetCategory";

const DisplayWidget = React.memo(() => {
  const { widgetList } = useWidgetAppContext();

  return (
    <div className="flex justify-center gap-y-8 flex-col w-full h-full mt-10 px-2">
      {widgetList?.map(
        (item) =>
          item.data.length > 0 &&
          item.data.some((item) => item.hide === false) && (
            <WidgetCategory item={item} key={item.categoryId} />
          )
      )}

      {!widgetList.some((widget) =>
        widget.data.some((item) => item.hide === false)
      ) && <InfoMessage />}
    </div>
  );
});

DisplayWidget.displayName = "DisplayWidget";

export default DisplayWidget;
