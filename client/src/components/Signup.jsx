import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Card from './shared/Card'
import Input from './shared/Input'
import Button from './shared/Button'
import httpInterceptor from '../lib/httpInterceptor'
import CatchError from '../lib/CatchError'

const Signup = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!formData.fullname || !formData.email || !formData.password) {
            toast.error('All fields are required')
            return
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        setLoading(true)

        try {
            await httpInterceptor.post('/auth/signup', {
                fullname: formData.fullname,
                email: formData.email,
                password: formData.password
            })
            
            toast.success('Account created! Please login.')
            navigate('/login')
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
                        <h1 className="text-2xl font-bold text-center mb-6">Signup</h1>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                                placeholder="Full Name"
                                required
                            />

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

                            <Input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                required
                            />

                            <Button
                                type="primary"
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? 'Please wait...' : 'Signup'}
                            </Button>
                        </form>

                        <div className="text-center text-sm mt-4">
                            <Link to="/login" className="text-blue-600">
                                Already have account? Login
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Signup