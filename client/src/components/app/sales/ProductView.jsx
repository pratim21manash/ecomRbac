import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Card from '../../shared/Card'
import Button from '../../shared/Button'
import CatchError from '../../../lib/CatchError'

const ProductView = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        loadProduct()
    }, [id])

    const loadProduct = () => {
        try {
            setLoading(true)
            const savedProducts = localStorage.getItem('products')
            
            if (savedProducts) {
                const products = JSON.parse(savedProducts)
                const foundProduct = products.find(p => p.id === id)
                
                if (foundProduct) {
                    setProduct(foundProduct)
                } else {
                    toast.error('Product not found')
                    navigate('/sales/products')
                }
            }
        } catch (err) {
            CatchError(err)
        } finally {
            setLoading(false)
        }
    }

    const addToCart = () => {
        try {
            if (!product) return
            
            if (quantity > product.inventory_quantity) {
                toast.error(`Only ${product.inventory_quantity} units available`)
                return
            }

            // Get existing cart
            const cart = JSON.parse(localStorage.getItem('cart') || '[]')
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.id === product.id)
            
            if (existingItem) {
                existingItem.quantity += quantity
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity,
                    sku: product.sku
                })
            }
            
            localStorage.setItem('cart', JSON.stringify(cart))
            toast.success(`${quantity} × ${product.name} added to cart!`)
            
            // Optional: Navigate to cart
            // navigate('/sales/cart')
        } catch (err) {
            CatchError(err)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-xl text-gray-600 animate-pulse">Loading product...</div>
            </div>
        )
    }

    if (!product) return null

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-4">
                <Link to="/sales/products" className="text-green-600 hover:underline flex items-center gap-1">
                    <i className="ri-arrow-left-line"></i>
                    Back to Products
                </Link>
            </div>

            <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-96 flex items-center justify-center">
                        <i className="ri-image-line text-8xl text-gray-400"></i>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                            <div className="flex gap-2 mt-2">
                                {product.status === 'active' ? (
                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                        Active
                                    </span>
                                ) : (
                                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                                        Inactive
                                    </span>
                                )}
                                {product.inventory_quantity <= 0 && (
                                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                                        Out of Stock
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="border-t border-b border-gray-200 py-4">
                            <p className="text-gray-600 leading-relaxed">{product.description}</p>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">SKU:</span>
                                <span className="font-medium">{product.sku}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Price:</span>
                                <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Available Stock:</span>
                                <span className={`font-medium ${
                                    product.inventory_quantity < 10 ? 'text-yellow-600' : 'text-green-600'
                                }`}>
                                    {product.inventory_quantity} units
                                </span>
                            </div>
                        </div>

                        {product.status === 'active' && product.inventory_quantity > 0 && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Quantity
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center justify-center"
                                        >
                                            <i className="ri-subtract-line"></i>
                                        </button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.min(
                                                product.inventory_quantity,
                                                Math.max(1, parseInt(e.target.value) || 1)
                                            ))}
                                            className="w-20 text-center border border-gray-300 rounded-lg py-2"
                                            min="1"
                                            max={product.inventory_quantity}
                                        />
                                        <button
                                            onClick={() => setQuantity(Math.min(product.inventory_quantity, quantity + 1))}
                                            className="w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center justify-center"
                                        >
                                            <i className="ri-add-line"></i>
                                        </button>
                                        <span className="text-sm text-gray-500 ml-2">
                                            Max: {product.inventory_quantity}
                                        </span>
                                    </div>
                                </div>

                                <Button 
                                    type="success" 
                                    icon="shopping-cart-line"
                                    onClick={addToCart}
                                    className="w-full py-3 text-lg"
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        )}

                        {(product.status !== 'active' || product.inventory_quantity <= 0) && (
                            <div className="p-4 bg-red-50 rounded-lg">
                                <p className="text-red-600 text-center">
                                    This product is currently not available for purchase
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ProductView