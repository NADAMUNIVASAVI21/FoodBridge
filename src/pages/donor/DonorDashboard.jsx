import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function DonorDashboard() {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    const fetchFoods = async () => {
      const snap = await getDocs(collection(db, "foods"));
      const myFoods = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(f => f.donorId === auth.currentUser.uid);

      setFoods(myFoods);
    };

    fetchFoods();
  }, []);

  const available = foods.filter(f => f.status === "available").length;
  const booked = foods.filter(f => f.status === "booked").length;
  const picked = foods.filter(f => f.status === "picked").length;

  return (
    <div style={container}>
      <div style={topBar}>
        <h1>Welcome Donor 🙌</h1>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/donor/profile" style={profileBtn}>👤 Profile</Link>

          <button onClick={logout} style={logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      <p style={subtitle}>
        Your generosity helps reduce hunger and food waste.
      </p>

      <div style={statsRow}>
        <StatBox title="Total Food Added" value={foods.length} />
        <StatBox title="Available" value={available} />
        <StatBox title="Booked" value={booked} />
        <StatBox title="Picked Up" value={picked} />
      </div>

      <div style={actionRow}>
        <Link to="/donor/add">
          <button style={primaryBtn}>➕ Add Food</button>
        </Link>

        <Link to="/donor/myfood">
          <button style={secondaryBtn}>📦 My Food</button>
        </Link>
      </div>

      <section style={section}>
        <h2>Recent Donations</h2>

        {foods.length === 0 && <p>No donations yet.</p>}

        {foods.slice(0, 3).map(food => (
          <div key={food.id} style={itemCard}>
            <strong>{food.name}</strong> — {food.quantity}
            <div style={{ color: "#666" }}>
              Status: <b>{food.status}</b>
            </div>
          </div>
        ))}
      </section>

      <section style={quoteBox}>
        “No one has ever become poor by giving.” — Anne Frank
      </section>
    </div>
  );
}

/* ✅ MISSING COMPONENT (FIX) */
function StatBox({ title, value }) {
  return (
    <div style={statBox}>
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const container = {
  padding: "30px",
  maxWidth: "1100px",
  margin: "auto"
};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const profileBtn = {
  background: "#424242",
  color: "white",
  padding: "8px 16px",
  borderRadius: "20px",
  textDecoration: "none"
};

const logoutBtn = {
  background: "#e53935",
  color: "white",
  padding: "8px 16px",
  borderRadius: "20px",
  border: "none",
  cursor: "pointer"
};

const subtitle = {
  color: "#555",
  marginBottom: "30px"
};

const statsRow = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "20px",
  marginBottom: "40px"
};

const statBox = {
  background: "#e8f5e9",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  fontWeight: "bold"
};

const actionRow = {
  display: "flex",
  gap: "20px",
  marginBottom: "40px"
};

const primaryBtn = {
  padding: "12px 26px",
  background: "#2e7d32",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const secondaryBtn = {
  padding: "12px 26px",
  background: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const section = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  marginBottom: "30px"
};

const itemCard = {
  padding: "12px 0",
  borderBottom: "1px solid #ddd"
};

const quoteBox = {
  padding: "30px",
  background: "linear-gradient(135deg, #e3f2fd, #e8f5e9)",
  borderRadius: "12px",
  textAlign: "center",
  fontStyle: "italic",
  fontSize: "18px"
};
