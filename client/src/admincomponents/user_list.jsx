import { getAllUser } from "../services/user";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

function UserList() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getAllUser();
                setUserData(res.data.users);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
                👥 User Management
            </h2>

            {/* Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        
                        {/* Header */}
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="p-3">ID</th>
                                <th className="p-3">Username</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Role</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {userData.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className={`border-b hover:bg-gray-50 ${
                                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    }`}
                                >
                                    <td className="p-3 text-sm">{user._id}</td>
                                    <td className="p-3 font-medium">{user.username}</td>
                                    <td className="p-3">{user.email}</td>

                                    {/* Role badge */}
                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                user.role === "admin"
                                                    ? "bg-red-100 text-red-600"
                                                    : user.role === "seller"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : "bg-green-100 text-green-600"
                                            }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    {/* Delete */}
                                    <td className="p-3 text-center">
                                        <button className="text-red-500 hover:text-red-700 text-xl">
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserList;