import React from "react";


const Profile = () => {
  const user = JSON.parse(localStorage.getItem("prepmate-user"));

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <h1 className="text-3xl font-bold">
        Profile: {user?.name}
      </h1>
    </div>
  );
};

export default Profile;
