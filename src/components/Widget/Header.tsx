import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Header = React.memo(() => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center">
      <h1 className="w-full text-center font-bold text-3xl md:text-5xl uppercase text-[#674188]">
        Widget World
      </h1>
      <span
        className="cursor-pointer active:scale-90 transition-all text-3xl md:text-4xl text-[#674188]"
        onClick={() => navigate("/store")}
        title="widget store"
      >
        <IoMdAddCircle />
      </span>
    </header>
  );
});
Header.displayName = "Header";
export default Header;
