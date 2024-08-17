import Header from "./Header";
import WidgetList from "./WidgetList";
import { Outlet } from "react-router-dom";

export type HANDLE_ADD_NEW_WIDGET_FUNC_PARAMS = {
  title: string;
  info: string;
  isNewCategory: boolean;
  categoryId?: string;
  newCategory?: string;
};

const WidgetApp = () => {
  return (
    <div className="min-w-screen min-h-screen  bg-[#F7EFE5] ">
      <div className="relative w-full h-full container mx-auto py-5">
        <Header />

        <main className="w-full h-full">
          <WidgetList />
        </main>

        <aside>
          <Outlet />
        </aside>
      </div>
    </div>
  );
};

export default WidgetApp;
