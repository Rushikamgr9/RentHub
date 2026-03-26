import { Link } from "react-router-dom"

function Home() {
  return (
    <div style={styles.container}>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroText}>
          <h1 style={styles.heading}>Welcome to RentHub</h1>
          <p style={styles.paragraph}>
            Find your ideal rental room easily and securely. 
            Landlords and tenants connect seamlessly.
          </p>
          <Link to="/login" style={styles.button}>
            Get Started
          </Link>
        </div>

        <div style={styles.heroImage}>
          <img 
            src="https://www.avail.co/wp-content/uploads/2021/08/8-tips-for-renting-out-a-house-for-the-first-time-min.jpg"
            alt="House"
            style={styles.image}
          />
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <h2 style={styles.featuresHeading}>Why RentHub?</h2>

        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Easy Search</h3>
            <p>Filter rooms by location, price and type.</p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Direct Chat</h3>
            <p>Communicate directly with landlords.</p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Secure & Reliable</h3>
            <p>Safe booking and trusted listings.</p>
          </div>
        </div>
      </section>

    </div>
  )
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    color: "#333"
  },

  heroSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "60px",
    backgroundColor: "#f7f9fc",
    flexWrap: "wrap"
  },

  heroText: {
    flex: 1,
    minWidth: "300px"
  },

  heading: {
    fontSize: "3rem",
    marginBottom: "20px",
    color: "#2c3e50"
  },

  paragraph: {
    fontSize: "1.2rem",
    marginBottom: "30px"
  },

  button: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "12px 30px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold"
  },

  heroImage: {
    flex: 1,
    minWidth: "300px",
    textAlign: "center"
  },

  image: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "10px"
  },

  featuresSection: {
    padding: "60px",
    textAlign: "center"
  },

  featuresHeading: {
    fontSize: "2.5rem",
    marginBottom: "40px",
    color: "#2c3e50"
  },

  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap"
  },

  card: {
    backgroundColor: "#f7f9fc",
    padding: "20px",
    borderRadius: "10px",
    width: "250px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  },

  cardTitle: {
    color: "#3498db",
    marginBottom: "15px"
  }
}

export default Home