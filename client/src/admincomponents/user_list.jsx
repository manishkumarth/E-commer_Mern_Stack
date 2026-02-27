
import { getAllUser } from "../services/user";
import { useState,useEffect } from "react";
import { MdDelete } from "react-icons/md";

function UserList() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getAllUser();
                setUserData(res.data.users);  
                console.log(res)
            } catch (err) {
                console.log(err);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <h2>User List</h2>

            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody className="">
                    {userData.map(user => (
                            <tr className="border" key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td><MdDelete/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
export default UserList