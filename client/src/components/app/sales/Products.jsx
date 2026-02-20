import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../shared/Card'
import Button from '../../shared/Button'
import CatchError from '../../../lib/CatchError'

const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
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

    if (loading) {
        return <div className="text-center py-10">Loading...</div>
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <p className="text-sm text-gray-500 mb-4">You can only edit name and price</p>

            {products.map(product => (
                <Card key={product.id} className="mb-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">{product.name}</h3>
                            <p className="text-sm">SKU: {product.sku} | Price: ₹{product.price} | Stock: {product.inventory_quantity}</p>
                        </div>
                        <Link to={`/sales/products/${product.id}`}>
                            <Button type="secondary">Edit</Button>
                        </Link>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default Products