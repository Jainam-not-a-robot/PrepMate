import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-full max-w-md p-8">
      <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
      <p className="text-gray-400 mb-6">Login to continue to PrepMate</p>

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 p-3 rounded bg-black/40 border border-white/10"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 p-3 rounded bg-black/40 border border-white/10"
      />

      <button
  onClick={() => {
    localStorage.setItem(
      "prepmate-user",
      JSON.stringify({ name: "Utkarsh" })
    );
    window.location.href = "/";
  }}
  className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded font-semibold"
>
  Login
</button>


      <p className="text-gray-400 mt-6 text-sm">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-indigo-400">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
