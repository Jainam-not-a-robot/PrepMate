import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="w-full max-w-md p-8">
      <h1 className="text-3xl font-bold mb-2">Create account</h1>
      <p className="text-gray-400 mb-6">Start using PrepMate today</p>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full mb-4 p-3 rounded bg-black/40 border border-white/10"
      />

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

      <input
      type = "password"
      placeholder = "confirm password"
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
  Create Account
</button>


      <p className="text-gray-400 mt-6 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-400">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
