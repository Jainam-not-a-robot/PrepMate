import { useEffect ,useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate()
  const [user , setUser] = useState(null)

  useEffect(()=>{
   const savedUser = JSON.parse(localStorage.getItem("prepmate-user"))
   setUser(savedUser)
  },[])

  const handleLogOut = () => {
    localStorage.removeItem("prepmate-user")
    setUser(null)
    navigate("/")
  }
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/80">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-indigo-400 font-bold text-xl">
            Prepmate
          </Link>

          <Link
            to="/upload"
            className="text-gray-300 hover:text-white transition"
          >
            Upload Files
          </Link>
        </div>

       {/* Right */}
        <div className="flex items-center gap-6">

          {!user ? (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition">
                Login
              </Link>
              <Link to="/signup" className="text-gray-300 hover:text-white transition">
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition">
                Dashboard
              </Link>
              <Link to="/profile" className="text-gray-300 hover:text-white transition">
                Profile
              </Link>
              <button
                onClick={handleLogOut}
                className="text-red-400 hover:text-red-300 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;


