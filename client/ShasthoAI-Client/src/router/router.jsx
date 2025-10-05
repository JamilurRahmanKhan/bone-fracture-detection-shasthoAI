import {
 createBrowserRouter,
} from "react-router-dom";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import Pricing from "../pages/Pricing/Pricing/Pricing";
import Signup from "../pages/Auth/Signup/Signup/Signup";
import NoLayout from "../layouts/NoLayout";
import Login from "../pages/Auth/Login/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import Store from "../pages/Store/Store/Store";
import ProductDetail from "../pages/Store/ProductDetail/ProductDetail/ProductDetail";
import Chat from "../pages/Chat/Chat/Chat";



export const router = createBrowserRouter([
 {
   path: '/',
   // Routes with navbar & footer
   Component: RootLayouts,
   children: [
    {
      index: true,
      Component: Home
    },
    {
        path: '/pricing', // Add this route
        Component: Pricing
    },
    {
        path: '/dashboard',
        Component: Dashboard
    },
    

   ]
 },
 {
    path: '/',
    // Routes without navbar & footer
    Component: NoLayout,
    children: [
      {
        path: '/signup',
        Component: Signup
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/store', // Add Medical Store route
        Component: Store
      },
      {
        path: '/store/product/:productId',
        Component: ProductDetail
      },
      {
        path: '/store', // Add Medical Store route
        Component: Store
      },
      {
        path: '/chat', // Add Chat route
        Component: Chat
      },
      // You can add more no-layout routes here later
    ]
  }
])
