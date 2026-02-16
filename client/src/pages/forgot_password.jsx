import { useState } from "react";
import { getSendOtp, getVerifyOtp, getForgotPassword } from "../services/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
    const [email, setEmail] = useState("manish099@gmail.com")
    const [otp, setOtp] = useState(["", "", "", ""])
    const [newPassword, setNewPassword] = useState("")
    const [check, setCheck] = useState(0)
    const navigate = useNavigate()
    const handleSendOtp = async () => {
        if (!email) {
            toast.error("Enter Email");
            return;
        }
        try {
            const res = await getSendOtp({ "email": email });
            toast.success(res.message || "OTP sent");
            setCheck(1);
        } catch (err) {
            const msg = err.response?.data?.message || "Something went wrong";
            toast.error(msg);
        }
    };

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        if (!value) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // move to next input
        if (index < 3) {
            e.target.nextSibling.focus();
        }
    };

    const handleBackspace = (e, index) => {
        if (e.key === "Backspace") {
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
            if (index > 0) {
                e.target.previousSibling.focus();
            }
        }
    };
    const isOtpComplete = otp.every(digit => digit !== "");
    const handleVerifyOtp = async () => {
        if (!isOtpComplete) {
            return
        }
        try {
            const res = await getVerifyOtp({ "email": email, "otp": Number(otp.join("")) })
            if (res) {
                toast.success(res.message || "otp verifyed")
                setCheck(2)
            }
        } catch (error) {
            console.log(error)
            toast.error("Invalid otp")
        }

    }

    const handleForgotPassword = async () => {
        if (!newPassword) {
            toast.error("create your password")
        }
        const res = await getForgotPassword({ "email": email, "newPassword": newPassword })
        if (res.message === 'Password updated successfully') {
            navigate("/login")
            setCheck(0)
        }
    }


    return (
        <div className="h-100 border flex justify-center items-center bg-gradient-to-br from-pink-100 via-white to-pink-50">
            {/* send otp  */}
            <div className="md:w-100 w-70 h-auto shadow p-5 rounded">
                {
                    check === 0 &&
                    <div className="flex flex-col gap-3 px-4">

                        <h3 className="text-center">Fortgot Password</h3>
                        <div className="">
                            <input className="border rounded w-full py-1 px-2" onChange={(e) => setEmail(e.target.value)} id="Email" type="text" placeholder="Enter Email" />
                        </div>
                        <div>
                            <button className="text-white bg-pink-300 hover:bg-pink-400 px-2 py-1 rounded w-full cursor-pointer text-bold" onClick={handleSendOtp}>Send Otp</button>
                        </div>
                    </div>

                }

                {/* verify otp  */}
                {
                    check === 1 &&
                    <div className="flex flex-col gap-3 px-4">
                        <h3 className="text-center">Verify OTP</h3>
                        {
                            <div className="flex gap-2 justify-between">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleBackspace(e, index)}
                                        className="w-10 h-10 text-center text-xl border rounded border-gray-200 focus:border-pink-300 outline-none"
                                    />
                                ))}
                            </div>

                        }
                        <div>
                            <button
                                disabled={!isOtpComplete}
                                className={`text-white px-2 py-1 rounded w-full font-bold
                                            ${isOtpComplete
                                        ? "bg-pink-400 cursor-pointer"
                                        : "bg-pink-300 cursor-not-allowed"}
                                         `}
                                onClick={handleVerifyOtp}
                            >
                                Verify
                            </button>

                        </div>

                    </div>}

                {/* New password */}
                {
                    check === 2 &&
                    <div className="flex flex-col gap-3 px-4">
                        <h3 className="text-center">Change Password</h3>
                        <div>
                            <input className="border rounded w-full py-1 px-2" onChange={(e) => setNewPassword(e.target.value)} type="text" placeholder="Enter password" />
                        </div>
                        <div>
                            <button className="text-white bg-pink-300 hover:bg-pink-400 px-2 py-1 rounded w-full cursor-pointer text-bold" onClick={handleForgotPassword}>Update</button>
                        </div>
                    </div>
                }
            </div>

        </div>

    );
}

export default ForgotPassword;
