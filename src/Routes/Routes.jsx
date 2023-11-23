import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import PrivtateRoute from "./PrivtateRoute";
import AllUsers from "../pages/Dashboard/All Users/AllUsers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItem/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>

        },{
            path:'menu',
            element:<Menu></Menu>
        },{
          path:'order/:category',
          element:<Order></Order>
        },{
          path:'login',
          element:<Login></Login>
        },{
          path:'/signup',
          element:<SignUp></SignUp>
        }
      ]
    },
    {
      path:'dashboard',
      element:<PrivtateRoute><Dashboard></Dashboard></PrivtateRoute>,
      children:[
        {
          path:'addItems',
          element:<AdminRoute><AddItems></AddItems></AdminRoute>
        },
        {
          path:'cart',
          element:<Cart></Cart>
        },{
          path:'users',
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        },{
          path:'manageItems',
          element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
        },{
          path:'updateItem/:id',
          element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          loader:({params})=>fetch(`http://localhost:5000/menu/${params.id}`)
        },
        {
          path:"payment",
          element:<Payment></Payment>
        },{
          path:'paymentHistory',
          element:<PaymentHistory></PaymentHistory>
        }
      ]
    }
  ]);