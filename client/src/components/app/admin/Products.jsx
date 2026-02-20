import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button  from '../../shared/Button'
import Card from '../../shared/Card'
import CatchError from '../../../lib/CatchError'

const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            // Mock data for demo
            setTimeout(() => {
                setProducts([
                    { 
                        _id: '1', 
                        name: 'Gaming Laptop', 
                        description: 'High performance gaming laptop with RTX 4060, 16GB RAM, 1TB SSD',
                        price: 1299.99, 
                        sku: 'LAP001', 
                        inventory_quantity: 25, 
                        status: 'active',
                        createdAt: '2024-01-15'
                    },
                    { 
                        _id: '2', 
                        name: 'Wireless Mouse', 
                        description: 'Ergonomic wireless mouse with long battery life and RGB lighting',
                        price: 29.99, 
                        sku: 'MOU001', 
                        inventory_quantity: 150, 
                        status: 'active',
                        createdAt: '2024-01-20'
                    },
                    { 
                        _id: '3', 
                        name: 'Mechanical Keyboard', 
                        description: 'RGB mechanical keyboard with blue switches and wrist rest',
                        price: 89.99, 
                        sku: 'KEY001', 
                        inventory_quantity: 50, 
                        status: 'active',
                        createdAt: '2024-02-01'
                    },
                    { 
                        _id: '4', 
                        name: '4K Monitor', 
                        description: '27-inch 4K UHD monitor for professionals, 100% sRGB',
                        price: 399.99, 
                        sku: 'MON001', 
                        inventory_quantity: 30, 
                        status: 'active',
                        createdAt: '2024-02-10'
                    },
                    { 
                        _id: '5', 
                        name: 'USB-C Hub', 
                        description: '7-in-1 USB-C hub with HDMI, Ethernet, and 3 USB ports',
                        price: 49.99, 
                        sku: 'HUB001', 
                        inventory_quantity: 100, 
                        status: 'inactive',
                        createdAt: '2024-02-15'
                    },
                    { 
                        _id: '6', 
                        name: 'SSD 1TB', 
                        description: 'NVMe M.2 SSD with read speeds up to 3500MB/s',
                        price: 89.99, 
                        sku: 'SSD001', 
                        inventory_quantity: 75, 
                        status: 'active',
                        createdAt: '2024-02-20'
                    }
                ])
                setLoading(false)
            }, 1000)
        } catch (err) {
            CatchError(err)
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return

        try {
            // Mock delete
            setProducts(products.filter(p => p._id !== id))
        } catch (err) {
            CatchError(err)
        }
    }

    const getStatusBadge = (status) => {
        return status === 'active' 
            ? <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>
            : <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Inactive</span>
    }

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-xl text-gray-600 animate-pulse">Loading products...</div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                <Link to="/admin/products/new">
                    <Button type="primary" icon="add-line">Add Product</Button>
                </Link>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <i className="ri-search-line absolute left-3 top-3 text-gray-400"></i>
                <input
                    type="text"
                    placeholder="Search products by name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-4">
                {filteredProducts.map((product) => (
                    <Card key={product._id} className="hover:shadow-xl transition">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                    {getStatusBadge(product.status)}
                                </div>
                                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                                <div className="flex flex-wrap gap-4 text-sm">
                                    <span className="text-gray-500">
                                        <span className="font-medium">SKU:</span> {product.sku}
                                    </span>
                                    <span className="text-gray-500">
                                        <span className="font-medium">Price:</span> ₹{product.price}
                                    </span>
                                    <span className="text-gray-500">
                                        <span className="font-medium">Stock:</span> {product.inventory_quantity}
                                    </span>
                                    <span className="text-gray-500">
                                        <span className="font-medium">Added:</span> {new Date(product.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                                <Link to={`/admin/products/${product._id}`}>
                                    <Button type="secondary" icon="edit-line" className="!px-3 !py-1">
                                        Edit
                                    </Button>
                                </Link>
                                <Button 
                                    type="danger" 
                                    icon="delete-bin-line"
                                    onClick={() => handleDelete(product._id)}
                                    className="!px-3 !py-1"
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <i className="ri-inbox-line text-6xl text-gray-300"></i>
                    <p className="text-gray-500 mt-4">No products found</p>
                </div>
            )}
        </div>
    )
}

export default Products