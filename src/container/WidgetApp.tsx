import DisplayWidget from "@components/DisplayWidget/DisplayWidget";
import Header from "@components/Header/Header";
import { Outlet } from "react-router-dom";

const WidgetApp = () => {
  return (
    <div className="min-w-screen min-h-screen  bg-[#F7EFE5] min-w-[270px] ">
      <div className="relative w-full h-full container mx-auto py-5">
        <Header />

        {/* widget show list */}
        <main className="w-full h-full">
          <DisplayWidget />
        </main>

        <aside>
          <Outlet />
        </aside>
      </div>
    </div>
  );
};

export default WidgetApp;
