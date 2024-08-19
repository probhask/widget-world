import WidgetApp from "@container/WidgetApp";
import Search from "@features/Store/Search/Search";
import Available from "@features/Store/StoreTabNavigate/Available/Available";
import CreateNew from "@features/Store/StoreTabNavigate/CreateNew/CreateNew";
import StoreTabNavigate from "@features/Store/StoreTabNavigate/StoreTabNavigate";
import WidgetStore from "@features/Store/WidgetStore";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <WidgetApp />,
    children: [
      {
        path: "store",
        element: <WidgetStore />,
        children: [
          {
            path: "",
            element: <StoreTabNavigate />,
            children: [
              {
                index: true,
                element: <Available />,
              },
              {
                path: "create-new",
                element: <CreateNew />,
              },
            ],
          },
          {
            path: "search",
            element: <Search />,
          },
        ],
      },
    ],
  },
]);
export default routes;
