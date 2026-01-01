import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div style={containerStyle}>
      <div style={topBar}>
        <h1 style={titleStyle}>Admin Dashboard</h1>

        <button onClick={logout} style={logoutBtn}>
          Logout
        </button>
      </div>

      <p style={subtitleStyle}>
        Manage users and monitor activity in FoodBridge.
      </p>

      <div style={buttonWrapper}>
        <Link to="/admin/users">
          <button style={btnStyle}>👥 Manage Users</button>
        </Link>

        <Link to="/admin/analytics">
          <button style={btnStyle}>📊 View Analytics</button>
        </Link>
      </div>
    </div>
  );
}

/* STYLES */

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f4f7fb, #e9efff)",
  padding: "40px",
  fontFamily: "Segoe UI, sans-serif",
};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const titleStyle = {
  fontSize: "32px",
  fontWeight: "700",
  color: "#1f2937",
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
  background: "#6366f1",
  color: "white",
  boxShadow: "0 8px 20px rgba(99,102,241,0.35)",
};

const logoutBtn = {
  padding: "10px 20px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};
