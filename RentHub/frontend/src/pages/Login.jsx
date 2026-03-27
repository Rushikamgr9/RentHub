import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import Card from "../components/ui/Card"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      })

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("role", res.data.role)

      navigate("/dashboard")
    } catch (err) {
      console.log(err)
      alert(err.response?.data?.error || "Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl animate-pulse delay-700" />

      <Card className="w-full max-w-md p-8 md:p-10 shadow-2xl bg-white/80 backdrop-blur-xl relative z-10 border-white/40">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-indigo-600 mb-2 block">RentHub</Link>
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 text-sm mt-2">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="space-y-1">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-right">
              <a href="#" className="text-xs text-indigo-600 hover:underline font-medium">Forgot password?</a>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full py-3 text-base shadow-lg shadow-indigo-500/20"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <p className="text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 font-bold hover:underline">
              Create one now
            </Link>
          </p>
        </form>
      </Card>
    </div>
  )
}