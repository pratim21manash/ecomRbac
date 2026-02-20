import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '../../shared/Button'
import Card from "../../shared/Card"
import Input from "../../shared/Input"
import CatchError from '../../../lib/CatchError'

const ProductForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({
        name: '',
        price: '',
        sku: '',
        description: '',
        inventory_quantity: '',
        status: ''
    })

    useEffect(() => {
        setLoading(true)
        const saved = localStorage.getItem('products')
        if (saved) {
            const found = JSON.parse(saved).find(p => p.id === id)
            if (found) setProduct(found)
            else navigate('/sales/products')
        }
        setLoading(false)
    }, [id])

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (!product.name || !product.price) {
            toast.error('Name and price are required')
            return
        }

        try {
            const saved = localStorage.getItem('products') || '[]'
            let products = JSON.parse(saved)
            
            products = products.map(p => 
                p.id === id 
                    ? { ...p, name: product.name, price: product.price, updatedAt: new Date() }
                    : p
            )
            
            localStorage.setItem('products', JSON.stringify(products))
            toast.success('Product updated')
            navigate('/sales/products')
        } catch (err) {
            CatchError(err)
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className="max-w-2xl mx-auto">
            <Link to="/sales/products" className="text-green-600 mb-4 block">← Back</Link>
            <Card>
                <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
                <p className="text-sm text-yellow-600 mb-4">You can only edit name and price</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="sku" value={product.sku} disabled placeholder="SKU" className="bg-gray-100" />
                    <Input name="name" value={product.name} onChange={handleChange} placeholder="Name" required className="border-green-300" />
                    <Input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required className="border-green-300" />
                    <textarea name="description" value={product.description} disabled placeholder="Description" className="w-full border p-2 rounded bg-gray-100" rows="3" />
                    <Input type="number" name="inventory_quantity" value={product.inventory_quantity} disabled placeholder="Stock" className="bg-gray-100" />
                    <Input name="status" value={product.status} disabled placeholder="Status" className="bg-gray-100 capitalize" />
                    <Button type="success">Update</Button>
                </form>
            </Card>
        </div>
    )
}

export default ProductForm