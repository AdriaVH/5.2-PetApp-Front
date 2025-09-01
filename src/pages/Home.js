import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-5xl font-bold mb-8 text-gray-800">🐾 Virtual Pets</h1>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition font-medium"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition font-medium"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Home;
