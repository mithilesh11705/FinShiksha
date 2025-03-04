import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./Components/Login";
import FinshikshaLanding from "./Components/FinshikshaLanding";
import Dashboard from "./Components/Dashboard";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Footer from "./Components/Footer";
import SignUp from "./Components/Signup";
import StudentDashboard from "./Components/StudentDashboard";
import AdminDashboard from "./Components/AdminDashboard";
const AppLayout = () => {
  return (
    <div className="app">
      <App />
      <Outlet />
      <Footer/>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <FinshikshaLanding/>,
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <SignUp/>
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/studentd",
        element: <StudentDashboard />,
      },
      {
        path: "/admind",
        element: <AdminDashboard />,
      },
    ],
  },
]);




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <RouterProvider router={router}>
      <AppLayout/>
    </RouterProvider>
  </React.StrictMode>
);
