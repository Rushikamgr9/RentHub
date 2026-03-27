import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import Card from "../components/ui/Card"
import Select from "../components/ui/Select"
import { PROVINCES, DISTRICTS_BY_PROVINCE, CITIES_BY_DISTRICT } from "../constants/nepalData"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [province, setProvince] = useState("")
  const [district, setDistrict] = useState("")
  const [city, setCity] = useState("")
  const [role, setRole] = useState("tenant")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Combine systematic address into one string
    const fullAddress = `${city}, ${district}, ${province}`

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
        address: fullAddress
      })
      alert("Registration successful! Please login.")
      navigate("/login")
    } catch (err) {
      console.log(err)
      alert(err.response?.data?.error || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl" />

      <Card className="w-full max-w-md p-8 md:p-10 shadow-2xl bg-white/80 backdrop-blur-xl relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-indigo-600 mb-2 block">RentHub</Link>
          <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
          <p className="text-slate-500 text-sm mt-2">Join our community today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Province"
              value={province}
              onChange={(v) => {
                setProvince(v);
                setDistrict("");
                setCity("");
              }}
              options={PROVINCES}
              placeholder="Select Province"
              required
            />
            <Select
              label="District"
              value={district}
              onChange={(v) => {
                setDistrict(v);
                setCity("");
              }}
              options={province ? DISTRICTS_BY_PROVINCE[province] : []}
              placeholder="Select District"
              required
              disabled={!province}
            />
            <Select
              label="City"
              value={city}
              onChange={setCity}
              options={district ? CITIES_BY_DISTRICT[district] : []}
              placeholder="Select City"
              required
              disabled={!district}
            />
          </div>

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 ml-1">I am a...</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole("tenant")}
                className={`py-2 rounded-lg border-2 transition-all ${
                  role === "tenant" 
                  ? "border-indigo-600 bg-indigo-50 text-indigo-600" 
                  : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
                } text-sm font-semibold`}
              >
                Tenant
              </button>
              <button
                type="button"
                onClick={() => setRole("landlord")}
                className={`py-2 rounded-lg border-2 transition-all ${
                  role === "landlord" 
                  ? "border-indigo-600 bg-indigo-50 text-indigo-600" 
                  : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
                } text-sm font-semibold`}
              >
                Landlord
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full py-3 mt-4"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>

          <p className="text-center text-sm text-slate-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </Card>
    </div>
  )
}