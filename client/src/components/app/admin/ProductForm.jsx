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
        description: '',
        price: '',
        sku: '',
        inventory_quantity: '',
        status: 'active'
    })

    const isEditing = !!id

    useEffect(() => {
        if (isEditing) {
            setLoading(true)
            const saved = localStorage.getItem('products')
            if (saved) {
                const found = JSON.parse(saved).find(p => p.id === id)
                if (found) setProduct(found)
                else navigate('/admin/products')
            }
            setLoading(false)
        }
    }, [id])

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (!product.name || !product.price || !product.sku) {
            toast.error('Name, price and SKU are required')
            return
        }

        try {
            const saved = localStorage.getItem('products') || '[]'
            let products = JSON.parse(saved)
            
            if (isEditing) {
                products = products.map(p => p.id === id ? { ...product, updatedAt: new Date() } : p)
                toast.success('Product updated')
            } else {
                const newProduct = { ...product, id: Date.now().toString(), createdAt: new Date() }
                products.push(newProduct)
                toast.success('Product created')
            }
            
            localStorage.setItem('products', JSON.stringify(products))
            navigate('/admin/products')
        } catch (err) {
            CatchError(err)
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className="max-w-2xl mx-auto">
            <Link to="/admin/products" className="text-blue-600 mb-4 block">← Back</Link>
            <Card>
                <h1 className="text-2xl font-bold mb-4">{isEditing ? 'Edit' : 'New'} Product</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="name" value={product.name} onChange={handleChange} placeholder="Name" required />
                    <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" rows="3" />
                    <Input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
                    <Input name="sku" value={product.sku} onChange={handleChange} placeholder="SKU" required />
                    <Input type="number" name="inventory_quantity" value={product.inventory_quantity} onChange={handleChange} placeholder="Stock" required />
                    <select name="status" value={product.status} onChange={handleChange} className="w-full border p-2 rounded">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <Button type="primary">{isEditing ? 'Update' : 'Create'}</Button>
                </form>
            </Card>
        </div>
    )
}

export default ProductForm