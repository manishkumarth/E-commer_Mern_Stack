import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { getLogin } from '../services/user'
import { loginSuccess, logout } from '../features/auth_slice';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" })
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.user.isAuth)
  const role = useSelector((state) => state.user.role)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!input.email) {
      toast.error("Please Enter Email");
      return;
    }

    if (!input.password) {
      toast.error("Please Enter Password");
      return;
    }

    try {
      const res = await getLogin(input);

      dispatch(loginSuccess(res.data));

      toast.success("Login success");

      if (res.data.role === "user") {
        navigate("/cart");
      } else {
        navigate("/dashboard"); 
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    console.log("login component re-render")
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>

        <div className="mt-8 bg-white shadow-xl rounded-2xl p-6">
          <form className="space-y-6">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
                type="email"
                required
                placeholder="Enter your email"
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <span onClick={() => navigate('/forgot-password')} className="text-sm font-medium text-pink-400 hover:text-pink-500 cursor-pointer">
                  Forgot password?
                </span>
              </div>

              <input
                value={input.password}
                onChange={(e) => setInput({ ...input, password: e.target.value })}
                type="password"
                required
                placeholder="Enter password"
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
              />
            </div>

            {/* Button */}
            <button
              onClick={handleLogin}
              type="button"
              className="w-full rounded-xl bg-pink-300 py-2.5 text-sm font-semibold text-white
          hover:bg-pink-400 transition focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Not a member?{" "}
            <span
              onClick={() => navigate("/register")}
              className="font-semibold text-pink-400 hover:underline cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>

  );
}

export default Login;





