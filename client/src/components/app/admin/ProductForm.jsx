import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import CatchError from '../../../lib/CatchError'
import Button from '../../shared/Button'
import Card from "../../shared/Card"
import Input from "../../shared/Input"

const ProductForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        sku: '',
        inventory_quantity: '',
        status: 'active'
    })

    const isEditing = !!id

    useEffect(() => {
        if (isEditing) {
            fetchProduct()
        }
    }, [id])

    const fetchProduct = async () => {
        try {
            setLoading(true)
            // Mock data for demo
            setTimeout(() => {
                setProduct({
                    _id: id,
                    name: 'Gaming Laptop',
                    description: 'High performance gaming laptop with RTX 4060, 16GB RAM, 1TB SSD',
                    price: '1299.99',
                    sku: 'LAP001',
                    inventory_quantity: '25',
                    status: 'active'
                })
                setLoading(false)
            }, 500)
        } catch (err) {
            CatchError(err)
            navigate('/admin/products')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setProduct(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            // Validate
            if (!product.name || !product.description || !product.price || !product.sku || !product.inventory_quantity) {
                throw new Error('All fields are required')
            }

            // Mock save
            setTimeout(() => {
                navigate('/admin/products')
            }, 500)
        } catch (err) {
            CatchError(err)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-xl text-gray-600 animate-pulse">Loading product...</div>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-4">
                <Link to="/admin/products" className="text-blue-600 hover:underline flex items-center gap-1">
                    <i className="ri-arrow-left-line"></i>
                    Back to Products
                </Link>
            </div>

            <Card>
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    {isEditing ? 'Edit Product' : 'Create New Product'}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Enter product description"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price (₹) <span className="text-red-500">*</span>
                            </label>
                            <Input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                SKU <span className="text-red-500">*</span>
                            </label>
                            <Input
                                name="sku"
                                value={product.sku}
                                onChange={handleChange}
                                placeholder="e.g., PROD001"
                                required
                                className="uppercase"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Inventory Quantity <span className="text-red-500">*</span>
                            </label>
                            <Input
                                type="number"
                                name="inventory_quantity"
                                value={product.inventory_quantity}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="status"
                                value={product.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="primary"
                            disabled={saving}
                        >
                            {saving ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
                        </Button>
                        <Link to="/admin/products">
                            <Button type="secondary">Cancel</Button>
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default ProductForm