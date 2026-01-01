import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Dashboard</h1>

      <p>Manage users and monitor activity in FoodBridge.</p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/admin/users">
          <button style={btnStyle}>👥 Manage Users</button>
        </Link>

        <Link to="/admin/analytics">
          <button style={{ ...btnStyle, marginLeft: "20px" }}>
            📊 View Analytics
          </button>
        </Link>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "14px 30px",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: "8px",
  border: "none",
  background: "#1976d2",
  color: "white"
};
