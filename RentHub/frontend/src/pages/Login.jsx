import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const [role, setRole] = useState("tenant")
  const navigate = useNavigate()

  const handleLogin = () => {
    // Save role in localStorage
    localStorage.setItem("userRole", role)

    // Redirect to dashboard
    navigate("/dashboard")
  }

  return (
    <div style={{ padding: "50px" }}>
      <h2>Login</h2>

      <input type="email" placeholder="Enter Email" />
      <br /><br />

      <input type="password" placeholder="Enter Password" />
      <br /><br />

      <label>Select Role:</label>
      <br />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="tenant">Tenant</option>
        <option value="landlord">Landlord</option>
      </select>

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login