import { createBrowserRouter } from "react-router-dom";
import WidgetApp from "../components/Widget/WidgetApp";
import WidgetStore from "../components/Widget/WidgetStore";
import AddNew from "../components/Widget/AddNew";
import ExistingWidget from "../components/Widget/ExistingWidget";
import Search from "../components/Widget/Search";
import WidgetForm from "../components/Widget/WidgetForm";

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
            element: <WidgetForm />,
            children: [
              {
                index: true,
                element: <ExistingWidget />,
              },
              {
                path: "add-new",
                element: <AddNew />,
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
