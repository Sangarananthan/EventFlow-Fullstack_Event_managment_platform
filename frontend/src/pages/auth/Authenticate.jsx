import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../redux/api/userApiSlice";
import { setCreadintials } from "../../redux/features/auth/authSlice";

// Login Component
export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const [login, { isLoading }] = useLoginMutation();

  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({
        email: formData.email,
        name: formData.name,
      }).unwrap();

      dispatch(setCreadintials(result.user));
      toast.success("Login successful!");
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || "Login failed");
    }
  };

  const handleGuestLogin = async () => {
    try {
      const result = await login({ isGuest: true }).unwrap();
      dispatch(setCreadintials(result.user));
      navigate(redirect);
    } catch (error) {
      toast.error("Guest login failed");
    }
  };

  const imageUrl =
    "https://res.cloudinary.com/dmy7zm3ip/image/upload/v1736687455/pexels-wolfgang-1002140-2747449_lro55g.jpg";

  return (
    <div className="min-h-screen bg-black flex">
      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      </div>
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto bg-neutral-100 p-[2rem] rounded-2xl">
          {/* Login Form */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-black">Welcome Back !</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-3 border  rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-3 border  rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />

              <button
                type="submit"
                className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-black ">or</span>
              </div>
            </div>

            {/* Guest Login Option */}
            <button
              onClick={handleGuestLogin}
              className="w-full py-3 px-4 rounded-md border  border-black  transition-colors text-black"
            >
              Continue as Guest
            </button>

            <div className="text-center">
              <button
                onClick={() => navigate("/register")}
                className="text-black font-medium"
              >
                Dont have an account?{" "}
                <span className="text-purple-600 hover:text-purple-700">
                  Sign up
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Register Component
export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { search } = useLocation();

  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await register({
        username: formData.username,
        email: formData.email,
        name: formData.name,
      }).unwrap();

      dispatch(setCreadintials(result.user));
      toast.success("Registration successful!");
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Registration Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-purple-600">eventbrite</h1>
          </div>

          {/* Registration Form */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-purple-900">
              Create an account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />

              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />

              <button
                type="submit"
                className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <div className="text-sm text-center">
              <span className="text-gray-600">Already have an account?</span>{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url('/api/placeholder/800/600')`,
          }}
        >
          <div className="h-full w-full bg-black bg-opacity-25 flex items-end p-8">
            <div className="text-white">
              <p className="text-lg font-semibold">Trap Yoga Bae</p>
              <p className="text-sm">Trap Yoga Brooklyn</p>
              <p className="text-sm">Brooklyn, NY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default { Login, Register };
