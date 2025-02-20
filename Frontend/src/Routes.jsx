import { createBrowserRouter, useRoutes } from "react-router-dom";
import Homepage from './pages/HomePage/Homepage'
import Signin from './pages/SignIn/Signin'
import Signup from './pages/SignUp/Signup'
import ProductList from './pages/ProductList/ProductList'
import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import App from "./App";
import OrderPage from "./pages/Orders/OrderPage";
import AdminLogin from "./components/AdminLogin";
import AdminRoute from "./AdminRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import AddProduct from "./pages/Dashboard/AddProduct/AddProduct";
import DeleteProduct from "./pages/Dashboard/DeleteProducts/DeleteProduct";
import UpdateProduct from "./pages/Dashboard/EditProduct/UpdateProduct";
import Women from "./pages/Sections/Women/women";
import Men from "./pages/Sections/Men/Men";
import Accessories from "./pages/Sections/Accessories/accessories";



const router = createBrowserRouter( [
        {
            path:"/",
            element:<Homepage/>

        },
        {
            path:"/signin",
            element:<Signin/>

        },
        {
            path:"/signup",
            element:<Signup/>

        },
        {
            path:"/productlist",
            element:<ProductList/>
        },
        {
            path:"/cart",
            element:<CartPage/>
        },
        {
            path:"/checkout",
            element:<CheckoutPage/>
        },
        {
            path:"/orders",
            element:<OrderPage/>
        },
        {
            path:"/admin",
            element:<AdminLogin/>
        },
        {
            path:"/women",
            element:<Women/>
        },
        {
            path:"/men",
            element:<Men/>
        },
        {
            path:"/admin",
            element:<AdminLogin/>
        },
        {
            path:"/accessories",
            element:<Accessories/>
        },
        {
            path:"/dashboard",
            element:<AdminRoute>
                <DashboardLayout/>
            </AdminRoute>,
            children:[
                {
                    path:"",
                    element:<AdminRoute><Dashboard/></AdminRoute>
                },
                {
                    path:"add-new-product",
                    element:<AdminRoute><AddProduct/></AdminRoute>
                },
                {
                    path:"edit-product/:id",
                    element:<AdminRoute><UpdateProduct/></AdminRoute>
                },
                {
                    path:"manage-products",
                    element:<AdminRoute><DeleteProduct/></AdminRoute>
                },
            ]
        }
    ]




)

export default router;