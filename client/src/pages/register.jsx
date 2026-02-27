import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import { useEffect } from 'react';
import { getRegister } from '../services/user';
import toast from 'react-hot-toast';
const Register = () => {
    const [profile, setProfile] = useState("")
    const [input, setInput] = useState({ username: "", email: "", password: "", role: "" })
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        if (!input.role) {
            toast.error("Please select your role")
            return
        }
        else if (!input.username) {
            toast.error("Enter your name")
            return
        } else if (!input.email) {
            toast.error("Enter Email")
            return
        } else if (!input.password) {
            toast.error("Enter password")
            return
        }
        const res = await getRegister(input)
        toast.success("login success")
        navigate('/login')
        console.log(res)
        // console.log()
    }
    useEffect(() => {
        console.log("register component re-render")
        console.log("userProfile", profile)
    })
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8">

                <h2 className="text-center text-2xl font-bold text-gray-900">
                    Create your account
                </h2>
                <p className="text-center text-sm text-gray-500 mt-1">
                    Choose your role and get started
                </p>

                <form className="space-y-6 mt-8">

                    {/* Profile Selection */}
                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-gray-700">
                            Select your profile
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            {["user", "seller"].map((role) => (
                                <label
                                    key={role}
                                    className={`flex items-center justify-center gap-2 p-4 border rounded-xl cursor-pointer transition
                              ${profile === role
                                            ? "border-pink-300 bg-pink-50 text-pink-300"
                                            : "border-gray-200 hover:border-gray-400"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="profile"
                                        value={role}
                                        checked={profile === role}
                                        onChange={(e) => {
                                            setProfile(e.target.value);
                                            setInput({ ...input, role: e.target.value });
                                        }}
                                        className="hidden"
                                    />
                                    <span className="font-medium capitalize">{role}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            value={input.username}
                            onChange={(e) =>
                                setInput({ ...input, username: e.target.value })
                            }
                            type="text"
                            placeholder="Enter username"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-pink-300"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            value={input.email}
                            onChange={(e) =>
                                setInput({ ...input, email: e.target.value })
                            }
                            type="email"
                            placeholder="Enter email"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-pink-300"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            value={input.password}
                            onChange={(e) =>
                                setInput({ ...input, password: e.target.value })
                            }
                            type="password"
                            placeholder="Enter password"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-pink-300"
                        />
                    </div>

                    {/* Button */}
                    <button
                        onClick={handleRegister}
                        type="button"
                        className="w-full cursor-pointer rounded-xl bg-pink-400 py-2.5 text-sm font-semibold text-white
          hover:bg-pink-300 transition"
                    >
                        Register
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="cursor-pointer font-semibold text-pink-600 hover:underline"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );

}

export default Register;
