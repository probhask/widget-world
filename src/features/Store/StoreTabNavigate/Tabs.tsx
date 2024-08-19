import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const isActiveStyle = "bg-[#674188] shadow-black/45";

const Tabs = React.memo(() => {
  const location = useLocation();
  const tab =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  return (
    <section title="tab">
      <nav>
        <ul className="flex w-full justify-evenly items-center bg-[#C8A1E0] text-[#F7EfE5] font-semibold px-2 py-1.5 transition-all uppercase">
          <NavLink
            to={"/store"}
            className={`${tab === "store" && isActiveStyle} w-full py-1 text-center cursor-pointer rounded shadow-sm transition-all`}
          >
            available
          </NavLink>
          <NavLink
            to={"create-new"}
            className={`${tab === "create-new" && isActiveStyle} w-full py-1 text-center cursor-pointer rounded shadow-sm transition-all`}
          >
            create new
          </NavLink>
        </ul>
      </nav>
    </section>
  );
});
Tabs.displayName = "Tabs";

export default Tabs;
