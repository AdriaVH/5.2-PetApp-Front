import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className=" natalia h-screen flex flex-col justify-center items-center">
      <div className=" pepi relative overflow-hidden bg-white bg-opacity-90 rounded-3xl p-12 shadow-2xl shadow-black flex flex-col items-center space-y-6 group animate-[zoom-in-out_2s_ease-in-out_infinite] z-10">
        {/* Inner content */}
        <div className="relative z-20">
          <h1 className="text-5xl font-bold text-gray-800">🐾 Virtual Pets</h1>
          <div className='flex justify-center'>
            <div className="flex  space-x-16 mt-8">
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
          </div></div>

        </div>

        {/* Zooming border effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 border-2 border-blue-500 opacity-50 rounded-3xl blur-[8px] animate-[zoom-in-out_2s_ease-in-out_infinite]" />
          <div className="absolute inset-[-10%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 animate-[zoom-in-out_5s_ease-in-out_infinite] delay-100" />
        </div>
      </div>
    </div>
  );
}

export default Home;