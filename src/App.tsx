import { RouterProvider } from "react-router-dom";
import { WidgetAppContextProvider } from "./context/WidgetAppContext";
import routes from "./router/routes";

function App() {
  return (
    <WidgetAppContextProvider>
      <RouterProvider router={routes} />
    </WidgetAppContextProvider>
  );
}

export default App;
