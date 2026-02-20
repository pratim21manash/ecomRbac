import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '../../shared/Button'
import Card from '../../shared/Card'
import CatchError from '../../../lib/CatchError'

const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async () => {
        try {
            setLoading(true)
            const saved = localStorage.getItem('products')
            if (saved) {
                setProducts(JSON.parse(saved))
            }
        } catch (err) {
            CatchError(err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = (id) => {
        if (!window.confirm('Delete product?')) return

        try {
            const updated = products.filter(p => p.id !== id)
            setProducts(updated)
            localStorage.setItem('products', JSON.stringify(updated))
            toast.success('Product deleted')
        } catch (err) {
            CatchError(err)
        }
    }

    if (loading) {
        return <div className="text-center py-10">Loading...</div>
    }

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Products</h1>
                <Link to="/admin/products/new">
                    <Button type="primary">Add</Button>
                </Link>
            </div>

            {products.map(product => (
                <Card key={product.id} className="mb-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">{product.name}</h3>
                            <p className="text-sm">SKU: {product.sku} | Price: ₹{product.price} | Stock: {product.inventory_quantity}</p>
                        </div>
                        <div className="flex gap-2">
                            <Link to={`/admin/products/${product.id}`}>
                                <Button type="secondary">Edit</Button>
                            </Link>
                            <Button type="danger" onClick={() => handleDelete(product.id)}>Delete</Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default Products