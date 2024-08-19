import { WidgetAppContextProvider } from "@context/WidgetAppContext";
import routes from "@router/routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <WidgetAppContextProvider>
      <RouterProvider router={routes} />
    </WidgetAppContextProvider>
  );
}

export default App;
