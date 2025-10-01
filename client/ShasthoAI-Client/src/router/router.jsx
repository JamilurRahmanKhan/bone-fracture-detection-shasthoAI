import {
 createBrowserRouter,
} from "react-router-dom";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home";



export const router = createBrowserRouter([
 {
   path: '/',
   Component: RootLayouts,
   children: [
    {
      index: true,
      Component: Home
    }
   ]
 }
])
