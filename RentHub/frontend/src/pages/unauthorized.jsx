import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Unauthorized</h2>
      <p>You do not have permission to view this page.</p>
      <p>
        <Link to="/dashboard">Go to dashboard</Link> or <Link to="/login">login</Link>.
      </p>
    </div>
  );
}

export default Unauthorized;
