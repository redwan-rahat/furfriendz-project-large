import {createBrowserRouter} from "react-router-dom";
import Root from "../Main/Root";
import ErrorPage404 from "../ErrorPage404/ErrorPage404";
import Home from "../HomePage/Home";
import Blogs from "../OtherPages/Blogs";
import ContactUs from "../OtherPages/ContactUs";
import Login from "../AuthProvider/Login";
import Register from "../AuthProvider/Register";
import PrivateRoutes from "../AuthProvider/PrivateRoutes";
import ShowDetails from "../ShowDetails/ShowDetails";
import MyCart from "../Cart/MyCart";
import Profile from "../AuthProvider/Profile";
import PetCareCenter from "../OtherPages/PetCareCenter";
import PetsAndProducts from "../OtherPages/PetsAndProducts";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<ErrorPage404></ErrorPage404>,
      children:[
        {
            path: '/',
            element:<Home></Home>,
        },
        {
          path:'/blog',
          element: <Blogs></Blogs>
        },
        {
          path:'/contactus',
          element: <ContactUs></ContactUs>
        },
        {
          path: '/shop',
          element:<PetsAndProducts></PetsAndProducts>
        },
        {
          path:'/login',
          element: <Login></Login>
        },
        {
          path:'/register',
          element: <Register></Register>,
          
          
        },
        {
          path: '/details/:type/:id',
          element: <ShowDetails></ShowDetails>
        },
        {
          path: '/mycart',
          element:<PrivateRoutes><MyCart></MyCart></PrivateRoutes>,
        },
        {
          path:'/profile',
          element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
        },
        {
          path:'/petcare',
          element: <PrivateRoutes><PetCareCenter></PetCareCenter></PrivateRoutes>,
          loader: ()=>fetch('Cameras.json')
        }
      ]
    },
  ]);
export default router;