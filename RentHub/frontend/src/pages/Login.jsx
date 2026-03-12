import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
import Input from "../components/Input";
import Button from "../components/Button";

function Login() {
  const [role, setRole] = useState("tenant")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const { login } = useAuth();

  const handleLogin = () => {
    // TODO: Add real validation and API authentication
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    login(role);
    navigate("/dashboard");
  }

  return (
    <div style={{ padding: "50px", maxWidth: "400px" }}>
      <h2>Login</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="input-group">
          <label>Select Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
          </select>
        </div>

        <Button type="submit" primary>Login</Button>
      </form>
    </div>
  )
}

export default Login