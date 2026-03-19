import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-text">
          <h1>Welcome to RentHub</h1>
          <p>Find your ideal rental room easily and securely. Landlords and tenants connect seamlessly.</p>
          <Link to="/login" className="btn btn-primary">Get started</Link>
        </div>
        <div className="hero-image">
          <img src="https://www.avail.co/wp-content/uploads/2021/08/8-tips-for-renting-out-a-house-for-the-first-time-min.jpg" alt="Rental Home" />
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why RentHub?</h2>
        <div className="features-cards">
          <div className="feature-card">
            <h3>Easy Search</h3>
            <p>Filter rooms by location, price, and features to find your perfect match.</p>
          </div>
          <div className="feature-card">
            <h3>Direct Chat</h3>
            <p>Communicate with landlords directly to schedule visits and clarify details.</p>
          </div>
          <div className="feature-card">
            <h3>Secure & Reliable</h3>
            <p>All transactions and bookings are safely managed on our platform.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;