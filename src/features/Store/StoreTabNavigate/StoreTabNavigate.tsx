import React from "react";
import { Outlet } from "react-router-dom";
import Tabs from "./Tabs";

const StoreTabNavigate = React.memo(() => {
  return (
    <>
      <Tabs />
      <Outlet />
    </>
  );
});

StoreTabNavigate.displayName = "StoreTabNavigate";
export default StoreTabNavigate;
