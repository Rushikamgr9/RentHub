import { Link } from "react-router-dom"
import Button from "../components/ui/Button"
import Card from "../components/ui/Card"

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation - Simple Overlay */}
      <nav className="absolute top-0 w-full z-10 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
        <div className="text-2xl font-bold text-white drop-shadow-md">RentHub</div>
        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-white hover:bg-white/10">Log In</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-blue text-indigo-600 hover:bg-slate-100">Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Modern Building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-slate-900/60" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Find Your Next <span className="text-indigo-400">Perfect Home</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            The most reliable platform for landlords and tenants to connect. 
            Smart searching, secure booking, and direct communication—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="w-full sm:w-auto px-10 py-4 text-lg bg-indigo-500 hover:bg-indigo-600 shadow-xl shadow-indigo-500/30">
                Get Started
              </Button>
            </Link>
            <Link to="/rooms">
              <Button variant="secondary" className="w-full sm:w-auto px-10 py-4 text-lg bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 shadow-xl">
                Browse Rooms
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose RentHub?</h2>
          <div className="w-20 h-1.5 bg-indigo-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 group hover:-translate-y-2 transition-transform duration-300 bg-white border-t-4 border-t-indigo-500">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Easy Search</h3>
            <p className="text-slate-600 leading-relaxed">
              Powerful filters to find exactly what you need. Filter by location, price range, and amenities with ease.
            </p>
          </Card>

          <Card className="p-8 group hover:-translate-y-2 transition-transform duration-300 bg-white border-t-4 border-t-indigo-500">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 19.16a1 1 0 01-1.011-1.255 1.748 1.748 0 00.322-.852 5.968 5.968 0 01-1.721-3.803C3 7.444 7.03 3.75 12 3.75s9 3.694 9 8.25z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Direct Chat</h3>
            <p className="text-slate-600 leading-relaxed">
              Skip the middleman. Chat directly with property owners in real-time to ask questions and schedule visits.
            </p>
          </Card>

          <Card className="p-8 group hover:-translate-y-2 transition-transform duration-300 bg-white border-t-4 border-t-indigo-500">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6.119c0 5.592 3.824 10.29 9.003 11.59a11.954 11.954 0 009.003-11.59c0-1.385-.233-2.712-.659-3.953a11.959 11.959 0 01-8.344-9.394C10.744 2.13 9.734 2.457 9 2.714z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Booking</h3>
            <p className="text-slate-600 leading-relaxed">
              Book with confidence. Our verified listings and secure system ensure a safe experience for everyone.
            </p>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-white mb-2">500+</div>
            <div className="text-slate-400">Rooms Listed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">1.2k</div>
            <div className="text-slate-400">Happy Tenants</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">200+</div>
            <div className="text-slate-400">Trusted Landlords</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">15+</div>
            <div className="text-slate-400">Major Cities</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold text-indigo-600">RentHub</div>
          <div className="flex gap-8 text-slate-500 text-sm">
            <a href="#" className="hover:text-indigo-600 transition-colors">About Us</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>
          <div className="text-slate-400 text-xs">
            © 2024 RentHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home