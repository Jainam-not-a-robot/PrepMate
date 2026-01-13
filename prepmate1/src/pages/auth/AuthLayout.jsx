import { Outlet } from "react-router-dom";
import bg from "../../assets/study-bg.png";

const AuthLayout = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(2,6,23,0.92), rgba(2,6,23,0.8), rgba(2,6,23,0.5)),
          url(${bg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Card */}
      <div className="w-full max-w-md bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

