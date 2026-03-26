import { useNavigate } from "react-router-dom";

export default function Topbar(){
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.removeItem("token");
    navigate("/login");
  }
  return(
    <div className="h-16 bg-gray-100 flex justify-between items-center px-6 shadow">
      <h3 className="text-xll font-semibold">Dashboard</h3>
      <button 
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}