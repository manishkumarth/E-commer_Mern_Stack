import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
function ProtectedAdmin(){
 const token = localStorage.getItem("token");
    const user=useSelector((state)=>state.user)
    console.log("user",user)
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin" && user.role !=="seller") {
    return <Navigate to="/" replace />; // block non-admin
  }

  return <Outlet />;
    

}
export default ProtectedAdmin