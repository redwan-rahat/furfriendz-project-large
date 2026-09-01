import { createBrowserRouter } from "react-router-dom";
import Root from "../Main/Root";
import ErrorPage404 from "../ErrorPage404/ErrorPage404";
import Home from "../HomePage/Home";
import Blogs from "../OtherPages/Blogs";
import ContactUs from "../OtherPages/ContactUs";
import Login from "../AuthProvider/Login";
import Register from "../AuthProvider/Register";
import PrivateRoutes from "../AuthProvider/PrivateRoutes";
import ShowDetails from "../ShowDetails/ShowDetails";
import Profile from "../AuthProvider/Profile";
import PetsAndProducts from "../OtherPages/PetsAndProducts";
import AdminRoutes from "../AuthProvider/AdminRoutes";
import Admin from "../AuthProvider/Admin";
import DeliveryRoutes from "../AuthProvider/DeliveryRoutes";
import Delivery from "../AuthProvider/Delivery/Delivery";
import BkashCheckout from "../OtherPages/BkashCheckout";
import MyOrders from "../OtherPages/MyOrders";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage404></ErrorPage404>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/blog',
        element: <Blogs></Blogs>
      },
      {
        path: '/contactus',
        element: <ContactUs></ContactUs>
      },
      {
        path: '/shop',
        element: <PetsAndProducts></PetsAndProducts>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: '/details/:type/:id',
        element: <ShowDetails></ShowDetails>
      },
      {
        path: '/profile',
        element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
      },
      {
        path: '/myorders',
        element: <PrivateRoutes><MyOrders></MyOrders></PrivateRoutes>,
      },
      {
        path: '/admin',
        element:
          <PrivateRoutes>
            <AdminRoutes>
              <Admin />
            </AdminRoutes>
          </PrivateRoutes>
      },
      {
        path: '/delivery',
        element:
          <PrivateRoutes>
            <DeliveryRoutes>
              <Delivery />
            </DeliveryRoutes>
          </PrivateRoutes>
      },
      {
        path: "/bkash-checkout",
        element: <BkashCheckout />
      }
    ]
  },
]);
export default router;