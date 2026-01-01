import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div style={containerStyle}>
  <h1 style={titleStyle}>Admin Dashboard</h1>

  <p style={subtitleStyle}>
    Manage users and monitor activity in FoodBridge.
  </p>

  <div style={buttonWrapper}>
    <Link to="/admin/users">
      <button
        style={btnStyle}
        onMouseOver={e => Object.assign(e.target.style, btnHoverStyle)}
        onMouseOut={e => Object.assign(e.target.style, btnStyle)}
      >
        👥 Manage Users
      </button>
    </Link>

    <Link to="/admin/analytics">
      <button
        style={btnStyle}
        onMouseOver={e => Object.assign(e.target.style, btnHoverStyle)}
        onMouseOut={e => Object.assign(e.target.style, btnStyle)}
      >
        📊 View Analytics
      </button>
    </Link>
  </div>
</div>

  );
}



const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f4f7fb, #e9efff)",
  padding: "40px",
  fontFamily: "Segoe UI, sans-serif",
};

const titleStyle = {
  fontSize: "32px",
  fontWeight: "700",
  color: "#1f2937",
  marginBottom: "10px",
};

const subtitleStyle = {
  fontSize: "16px",
  color: "#6b7280",
  marginBottom: "40px",
};

const buttonWrapper = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
};

const btnStyle = {
  padding: "16px 36px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  borderRadius: "12px",
  border: "none",
  background: "#8888fbff",
  color: "white",
  boxShadow: "0 8px 20px rgba(37, 99, 235, 0.25)",
  transition: "all 0.3s ease",
};

const btnHoverStyle = {
  transform: "translateY(-3px)",
  boxShadow: "0 12px 28px rgba(37, 99, 235, 0.35)",
};
