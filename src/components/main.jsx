import { createRoot } from "react-dom/client";
import { Outlet, RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import SignUpVendor from "./SignUpVendor";
import SignUpAdmin from "./SignUpAdmin";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import VendorDashboard from "./VendorsDashboard"

const AppLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      { 
        path: "/registervendor",
        element: <SignUpVendor /> 
      },
      { 
        path: "/registeradmin", 
        element: <SignUpAdmin /> 
      },
      {
        path: "/resetpassword",
        element: <ForgotPassword />,
      },
      {
        path:"/admin/*",
        element:<AdminDashboard />
      },
      {
        path:"/vendor/*",
        element:<VendorDashboard />
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
