import React from "react";
import Tabs from "./Tabs";
import { Outlet } from "react-router-dom";

const WidgetForm = React.memo(() => {
  return (
    <>
      <Tabs />

      <Outlet />
    </>
  );
});

WidgetForm.displayName = "WidgetForm";
export default WidgetForm;
