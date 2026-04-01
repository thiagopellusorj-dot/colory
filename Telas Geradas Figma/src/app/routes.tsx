import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Processing } from "./pages/Processing";
import { Result } from "./pages/Result";
import { MyPages } from "./pages/MyPages";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/processing",
    Component: Processing,
  },
  {
    path: "/result",
    Component: Result,
  },
  {
    path: "/my-pages",
    Component: MyPages,
  },
  {
    path: "/settings",
    Component: Settings,
  },
]);