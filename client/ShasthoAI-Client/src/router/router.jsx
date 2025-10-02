import {
 createBrowserRouter,
} from "react-router-dom";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import Pricing from "../pages/Pricing/Pricing/Pricing";



export const router = createBrowserRouter([
 {
   path: '/',
   Component: RootLayouts,
   children: [
    {
      index: true,
      Component: Home
    },
    {
        path: '/pricing', // Add this route
        Component: Pricing
      }

   ]
 }
])
