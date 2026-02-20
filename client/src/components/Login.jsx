import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Card from './shared/Card'
import Input from './shared/Input'
import Button from './shared/Button'
import httpInterceptor from '../lib/httpInterceptor'
import CatchError from '../lib/CatchError'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!formData.email || !formData.password) {
            toast.error('Email and password are required')
            return
        }

        setLoading(true)

        try {
            const { data } = await httpInterceptor.post('/auth/login', formData)
            
            // Store user in localStorage
            localStorage.setItem('user', JSON.stringify(data.user))
            
            toast.success('Login successful!')
            
            // Redirect based on role
            if (data.user.role === 'admin') {
                navigate('/admin/dashboard')
            } else {
                navigate('/sales/dashboard')
            }
        } catch (err) {
            CatchError(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md">
                <Card noPadding>
                    <div className="p-8">
                        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />

                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                            />

                            <Button
                                type="primary"
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? 'Please wait...' : 'Login'}
                            </Button>
                        </form>

                        <div className="text-center mt-4">
                            <button
                                type="button"
                                onClick={() => setFormData({ email: 'admin@example.com', password: 'admin123' })}
                                className="text-blue-600 text-sm mx-2"
                            >
                                Admin
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                                type="button"
                                onClick={() => setFormData({ email: 'sales@example.com', password: 'sales123' })}
                                className="text-green-600 text-sm mx-2"
                            >
                                Sales
                            </button>
                        </div>

                        <div className="text-center text-sm mt-4">
                            <Link to="/signup" className="text-blue-600">
                                Create account
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Login