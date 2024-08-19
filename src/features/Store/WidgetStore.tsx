import useDetectOutsideClick from "@hook/useDetectOutsideClick";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useNavigate, Link, Outlet } from "react-router-dom";

const WidgetStore = React.memo(() => {
  const navigate = useNavigate();
  const widgetStoreRef = useDetectOutsideClick(() => navigate("/"));

  return (
    <div className=" w-full h-full fixed top-0 right-0 bottom-0 left-0 flex justify-end bg-neutral-900/70">
      <div
        ref={widgetStoreRef}
        className=" sm:w-[70%] md:w-[60%] lg:w-[40%] w-full h-full bg-[#F7EFE5] shadow-xl"
      >
        {/* header */}
        <div className="w-full h-full relative">
          <h1 className="w-full bg-[#674188] text-[#F7EfE5] p-3 text-2xl sm:text-center  font-bold uppercase ">
            Widget Store
          </h1>
          <div className="absolute top-3.5 right-3 flex items-center gap-2">
            <Link
              to="search"
              className="cursor-pointer active:scale-90 transition-all bg-[#C8A1E0]   p-1 rounded-full flex justify-center items-center size-6"
              title="search"
            >
              <FaSearch />
            </Link>
            <Link
              to="/"
              className=" text-3xl bg-[#C8A1E0] active:scale-90 cursor-pointer transition-all p-1 rounded-full flex justify-center items-center size-6"
              title="close"
            >
              <MdClose />
            </Link>
          </div>

          {/* search or tabs navigate */}
          <Outlet />
        </div>
      </div>
    </div>
  );
});

export default WidgetStore;
