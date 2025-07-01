import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Ministry from "./pages/Ministry/Ministry";
import Services from "./pages/Services";
import Images from "./pages/Images";
import JoinUs from "./pages/JoinUs/JoinUs";
import Donation from "./pages/Donation";
import Books from "./pages/Books";
import Login from "./pages/Login";

const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "ministry", element: <Ministry /> },
      { path: "services", element: <Services /> },
      { path: "images", element: <Images /> },
      { path: "join-us", element: <JoinUs /> },
      { path: "donation", element: <Donation /> },
      { path: "books", element: <Books /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

export default routes;
