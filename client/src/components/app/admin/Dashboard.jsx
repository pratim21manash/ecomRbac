import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from "../../shared/Card"
import Button from "../../shared/Button"

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        activeProducts: 0,
        inactiveProducts: 0,
        totalUsers: 0
    })
    const [recentProducts, setRecentProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            // For demo, using mock data
            setTimeout(() => {
                setStats({
                    totalProducts: 45,
                    activeProducts: 32,
                    inactiveProducts: 13,
                    totalUsers: 128
                })
                setRecentProducts([
                    { _id: '1', name: 'Gaming Laptop', price: 1299.99, status: 'active', sku: 'LAP001' },
                    { _id: '2', name: 'Wireless Mouse', price: 29.99, status: 'active', sku: 'MOU001' },
                    { _id: '3', name: 'Mechanical Keyboard', price: 89.99, status: 'active', sku: 'KEY001' },
                    { _id: '4', name: '4K Monitor', price: 399.99, status: 'inactive', sku: 'MON001' },
                    { _id: '5', name: 'USB-C Hub', price: 49.99, status: 'active', sku: 'HUB001' }
                ])
                setLoading(false)
            }, 1000)
        } catch (err) {
            console.error('Error fetching stats:', err)
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-xl text-gray-600 animate-pulse">Loading dashboard...</div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="text-center hover:shadow-xl transition">
                    <div className="py-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="ri-shopping-bag-line text-2xl text-blue-600"></i>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800">{stats.totalProducts}</h3>
                        <p className="text-gray-600">Total Products</p>
                    </div>
                </Card>

                <Card className="text-center hover:shadow-xl transition">
                    <div className="py-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="ri-checkbox-circle-line text-2xl text-green-600"></i>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800">{stats.activeProducts}</h3>
                        <p className="text-gray-600">Active Products</p>
                    </div>
                </Card>

                <Card className="text-center hover:shadow-xl transition">
                    <div className="py-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="ri-forbid-line text-2xl text-gray-600"></i>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800">{stats.inactiveProducts}</h3>
                        <p className="text-gray-600">Inactive Products</p>
                    </div>
                </Card>

                <Card className="text-center hover:shadow-xl transition">
                    <div className="py-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="ri-user-line text-2xl text-purple-600"></i>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800">{stats.totalUsers}</h3>
                        <p className="text-gray-600">Total Users</p>
                    </div>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Quick Actions">
                    <div className="space-y-3">
                        <Link to="/admin/products/new">
                            <button className="w-full text-left p-3 hover:bg-gray-50 rounded flex items-center gap-3">
                                <i className="ri-add-circle-line text-green-500"></i>
                                Add New Product
                            </button>
                        </Link>
                        <Link to="/admin/products">
                            <button className="w-full text-left p-3 hover:bg-gray-50 rounded flex items-center gap-3">
                                <i className="ri-edit-box-line text-blue-500"></i>
                                Manage Products
                            </button>
                        </Link>
                        <Link to="/admin/users">
                            <button className="w-full text-left p-3 hover:bg-gray-50 rounded flex items-center gap-3">
                                <i className="ri-user-settings-line text-purple-500"></i>
                                Manage Users
                            </button>
                        </Link>
                    </div>
                </Card>

                <Card title="Recent Products">
                    <div className="space-y-3">
                        {recentProducts.slice(0, 4).map((product) => (
                            <Link 
                                key={product._id} 
                                to={`/admin/products/${product._id}`}
                                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                            >
                                <div>
                                    <h4 className="font-medium">{product.name}</h4>
                                    <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                                </div>
                                <span className={`text-sm font-medium ${product.status === 'active' ? 'text-green-600' : 'text-gray-400'}`}>
                                    ₹{product.price}
                                </span>
                            </Link>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard