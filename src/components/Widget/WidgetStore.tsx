import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import useDetectOutsideClick from "../../hook/useDetectOutsideClick";
import { FaSearch } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";

const WidgetStore = React.memo(() => {
  const navigate = useNavigate();
  const navigateHomeBack = () => navigate("/");
  const widgetStoreRef = useDetectOutsideClick(navigateHomeBack);

  return (
    <div className=" w-full h-full fixed top-0 right-0 bottom-0 left-0 flex justify-end">
      <div
        ref={widgetStoreRef}
        className=" sm:w-[70%] md:w-[60%] lg:w-[40%] w-full h-full bg-[#F7EFE5] shadow-xl"
      >
        <div className="w-full h-full relative">
          <h1 className="w-full bg-[#674188] text-[#F7EfE5] p-3 text-2xl sm:text-center  font-bold uppercase ">
            Widget Store
          </h1>
          <div className="absolute top-2.5 right-3 flex items-center gap-2">
            <span
              className="cursor-pointer active:scale-90 transition-all bg-[#C8A1E0]   p-1 rounded-full flex justify-center items-center size-6"
              title="search"
              onClick={() => navigate("search")}
            >
              <FaSearch />
            </span>
            <span
              className=" text-3xl text-[#C8A1E0] active:scale-90 cursor-pointer transition-all"
              onClick={navigateHomeBack}
              title="close"
            >
              <AiFillCloseCircle />
            </span>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
});

export default WidgetStore;
