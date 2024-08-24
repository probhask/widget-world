import ErrorBoundary from "@components/ErrorBoundary/ErrorBoundary";
import ErrorElement from "@components/ErrorElement/ErrorElement";
import WidgetApp from "@container/WidgetApp";
import Search from "@features/Store/Search/Search";
import Available from "@features/Store/StoreTabNavigate/Available/Available";
import CreateNew from "@features/Store/StoreTabNavigate/CreateNew/CreateNew";
import StoreTabNavigate from "@features/Store/StoreTabNavigate/StoreTabNavigate";
import { lazy, Suspense } from "react";
const WidgetStore = lazy(() => import("../features/Store/WidgetStore"));
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <WidgetApp />
      </ErrorBoundary>
    ),
    errorElement: <ErrorElement />,
    children: [
      {
        path: "store",
        element: (
          <Suspense>
            <WidgetStore />
          </Suspense>
        ),
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
