import React, { useState, useEffect } from 'react'
import Card from '../../shared/Card'

const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            // Mock data for demo
            setTimeout(() => {
                setUsers([
                    { 
                        _id: '1', 
                        fullname: 'Admin User', 
                        email: 'admin@example.com', 
                        role: 'admin',
                        createdAt: '2024-01-01'
                    },
                    { 
                        _id: '2', 
                        fullname: 'John Smith', 
                        email: 'john@example.com', 
                        role: 'sales',
                        createdAt: '2024-01-15'
                    },
                    { 
                        _id: '3', 
                        fullname: 'Sarah Johnson', 
                        email: 'sarah@example.com', 
                        role: 'sales',
                        createdAt: '2024-01-20'
                    },
                    { 
                        _id: '4', 
                        fullname: 'Mike Wilson', 
                        email: 'mike@example.com', 
                        role: 'sales',
                        createdAt: '2024-02-01'
                    },
                    { 
                        _id: '5', 
                        fullname: 'Emily Brown', 
                        email: 'emily@example.com', 
                        role: 'sales',
                        createdAt: '2024-02-10'
                    }
                ])
                setLoading(false)
            }, 1000)
        } catch (err) {
            console.error('Error fetching users:', err)
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-xl text-gray-600 animate-pulse">Loading users...</div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Users</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <Card key={user._id} className="hover:shadow-xl transition">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
                                {user.fullname[0].toUpperCase()}
                            </div>
                            <h3 className="text-lg font-semibold mt-3 text-gray-800">{user.fullname}</h3>
                            <p className="text-gray-600 text-sm">{user.email}</p>
                            <div className="mt-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    user.role === 'admin' 
                                        ? 'bg-purple-100 text-purple-800' 
                                        : 'bg-green-100 text-green-800'
                                }`}>
                                    {user.role}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-3">
                                Joined: {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Users