import React from "react";
import { FaSearch, FaStore } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = React.memo(() => {
  return (
    <header className="flex flex-col gap-3 sm:gap-10 items-center justify-between px-2 min-w-[220px]">
      <h1 className="sm:w-full text-center px-2 font-bold text-3xl  sm:text-6xl uppercase text-[#674188]">
        Widget World
      </h1>
      <div className="flex items-center gap-3 sm:gap-2 text-[#674188]">
        <Link
          to="/store/search"
          className="cursor-pointer active:scale-90 transition-all sm:border border-[#671488] sm:py-1 sm:px-2 sm:rounded-md flex items-center gap-1  sm:hover:text-[#F7EFE5] sm:hover:bg-[#671488] rounded-full bg-[#671488] sm:bg-inherit text-[#F7EFE5] h-6 w-6 sm:w-max sm:h-max justify-center sm:text-inherit"
          title="header-create-new"
        >
          <FaSearch />
          <span className="hidden sm:block">search</span>
        </Link>
        <Link
          to="/store/create-new?category=new"
          className="cursor-pointer active:scale-90 transition-all sm:border border-[#671488] sm:py-1 sm:px-2 rounded-md flex items-center gap-1 w-max sm:hover:text-[#F7EFE5] sm:hover:bg-[#671488]"
          title="header-create-new"
        >
          <HiPlus className="hidden sm:block text-xl  " />
          <IoMdAddCircle className="sm:hidden text-3xl" />
          <span className="hidden sm:block">Create New</span>
        </Link>
        <Link
          to="/store"
          className="cursor-pointer active:scale-90 transition-all flex items-center gap-1 sm:border border-[#671488] sm:py-1 sm:px-2 rounded-md w-max sm:hover:text-[#F7EFE5] sm:hover:bg-[#671488]"
          title="widget-store"
        >
          <FaStore className="text-2xl sm:text-xl" />
          <span className="hidden sm:block">Store</span>
        </Link>
      </div>
    </header>
  );
});
Header.displayName = "Header";
export default Header;
