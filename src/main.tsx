import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ErrorBoundary from "@components/ErrorBoundary/ErrorBoundary.tsx";
import { BiLoaderCircle } from "react-icons/bi";
const App = React.lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className="w-screen h-screen flex justify-center items-center">
          <BiLoaderCircle className="size-10 md:size-20 animate-spin text-[#671488] duration-75 ease-in" />
        </div>
      }
    >
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Suspense>
  </React.StrictMode>
);
