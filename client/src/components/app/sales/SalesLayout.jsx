import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SalesLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const location = useLocation()

    const menus = [
        { 
            icon: 'shopping-bag-line', 
            label: 'Products', 
            href: '/sales/products',
            active: location.pathname.includes('/sales/products')
        }
    ]

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar - Different color scheme for sales */}
            <aside 
                className="fixed top-0 left-0 h-full bg-gradient-to-b from-green-900 via-teal-800 to-green-900 text-white transition-all duration-300"
                style={{ width: sidebarOpen ? '280px' : '80px' }}
            >
                {/* Logo */}
                <div className="p-6 flex items-center gap-3">
                    {sidebarOpen ? (
                        <h2 className="text-xl font-bold">Sales Portal</h2>
                    ) : (
                        <i className="ri-store-line text-2xl mx-auto"></i>
                    )}
                </div>

                {/* User Info */}
                {sidebarOpen && (
                    <div className="px-6 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <i className="ri-user-fill text-xl"></i>
                            </div>
                            <div>
                                <h3 className="font-medium">Sales User</h3>
                                <p className="text-xs text-gray-300">sales@example.com</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <nav className="mt-8">
                    {menus.map((item, index) => (
                        <Link
                            key={index}
                            to={item.href}
                            className={`flex items-center gap-4 px-6 py-3 hover:bg-white/10 transition ${
                                item.active ? 'bg-white/10 border-l-4 border-white' : ''
                            }`}
                        >
                            <i className={`ri-${item.icon} text-xl`}></i>
                            {sidebarOpen && <span className="capitalize">{item.label}</span>}
                        </Link>
                    ))}

                    <button
                        className="w-full flex items-center gap-4 px-6 py-3 hover:bg-white/10 transition mt-4 text-gray-300"
                    >
                        <i className="ri-logout-box-line text-xl"></i>
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </nav>

                {/* Toggle Button */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="absolute -right-3 top-20 bg-white text-green-900 rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                >
                    <i className={`ri-arrow-${sidebarOpen ? 'left' : 'right'}-s-line`}></i>
                </button>
            </aside>

            {/* Main Content */}
            <main 
                className="p-8 transition-all duration-300 min-h-screen"
                style={{ marginLeft: sidebarOpen ? '280px' : '80px' }}
            >
                <Outlet />
            </main>

            <ToastContainer position="top-center" />
        </div>
    )
}

export default SalesLayout