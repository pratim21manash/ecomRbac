import { Link } from 'react-router-dom'

const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            
            <h1 className="text-4xl font-bold mb-8 text-gray-800">
                Ecommerce Application
            </h1>

            <div className="flex gap-4">
                {user ? (
                    <Link to={user.role === 'admin' ? '/admin/dashboard' : '/sales/dashboard'}>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Go to Dashboard
                        </button>
                    </Link>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Signup
                            </button>
                        </Link>
                    </>
                )}
            </div>

        </div>
    )
}

export default Home