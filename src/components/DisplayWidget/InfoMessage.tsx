import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";

const InfoMessage = React.memo(() => {
  return (
    <div className="w-full h-full flex flex-col items-center mt-20 gap-y-2 text-neutral-600">
      <h4 className="uppercase text-2xl font-semibold text-center">
        add some widget from store
      </h4>
      <h6 className="flex items-center justify-center flex-wrap gap-y-0.5 gap-x-2 text-lg text-center mt-3">
        <span className="flex gap-2 flex-wrap items-center justify-center">
          Click <AiFillPlusCircle className="text-[#671488] text-2xl" /> icon
        </span>
        at the top-right corner to create new
      </h6>
    </div>
  );
});

InfoMessage.displayName = "InfoMessage";
export default InfoMessage;
