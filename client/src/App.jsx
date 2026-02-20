import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Dashboard from "./components/app/admin/Dashboard"
import AdminLayout from "./components/app/admin/adminLayout"
import Product from "./components/app/admin/Products"
import ProductForm from "./components/app/admin/ProductForm"
import Users from "./components/app/admin/Users"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
               <Route path="/" element={<Navigate to="/admin/dashboard" />} />
               <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />}/>

                    <Route path="product" element={<Product />} />
                    <Route path="product/new" element={<ProductForm />} />
                    <Route path="product/:id" element={<ProductForm />} />
                    <Route path="users" element={<Users />} />
               </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App