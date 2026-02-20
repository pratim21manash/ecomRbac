import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Admin
import AdminLayout from "./components/app/admin/AdminLayout"
// import AdminDashboard from "./components/app/admin/Dashboard"
import AdminProducts from "./components/app/admin/Products"
import AdminProductForm from "./components/app/admin/ProductForm"
import AdminUsers from "./components/app/admin/Users"

// Sales
import SalesLayout from "./components/app/sales/SalesLayout"
// import SalesDashboard from "./components/app/sales/Dashboard"
import SalesProducts from "./components/app/sales/Products"
import SalesProductForm from "./components/app/sales/ProductForm"

// Auth
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="products" />} />
                    {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="products/new" element={<AdminProductForm />} />
                    <Route path="products/:id" element={<AdminProductForm />} />
                    <Route path="users" element={<AdminUsers />} />
                </Route>

                <Route path="/sales" element={<SalesLayout />}>
                    <Route index element={<Navigate to="products" />} />
                    {/* <Route path="dashboard" element={<SalesDashboard />} /> */}
                    <Route path="products" element={<SalesProducts />} />
                    <Route path="products/:id" element={<SalesProductForm />} />
                </Route>
            </Routes>
            <ToastContainer position="top-center" />
        </BrowserRouter>
    )
}

export default App