import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function NgoDashboard() {
  const [foods, setFoods] = useState([]);
  const [bookedFoods, setBookedFoods] = useState([]);
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "foods"));
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));

      setFoods(all.filter(f => f.status === "available"));
      setBookedFoods(
        all.filter(
          f => f.status === "booked" && f.bookedBy === auth.currentUser.uid
        )
      );
    };

    fetchData();
  }, []);

  return (
    <div style={container}>
      <div style={topBar}>
        <h1>Welcome NGO 👋</h1>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/ngo/profile" style={profileBtn}>👤 Profile</Link>

          <button onClick={logout} style={logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      <p style={subtitle}>Helping fight hunger together</p>

      <div style={statsRow}>
        <StatBox title="Food Booked" value={bookedFoods.length} />
        <StatBox title="Active Donors" value={new Set(foods.map(f => f.donorId)).size} />
        <StatBox title="Pending Pickups" value={bookedFoods.length} />
        <StatBox title="Messages" value="Chat" />
      </div>

      <section style={section}>
        <h2>Available Food</h2>

        {foods.length === 0 && <p>No food available</p>}

        {foods.slice(0, 3).map(food => (
          <div key={food.id} style={itemCard}>
            <strong>{food.name}</strong> – {food.quantity}
          </div>
        ))}

        <Link to="/ngo/available">
          <button style={btn}>View All</button>
        </Link>
      </section>

      <section style={sectionAlt}>
        <h2>My Bookings</h2>

        {bookedFoods.length === 0 && <p>No bookings yet.</p>}

        {bookedFoods.slice(0, 3).map(food => (
          <div key={food.id} style={itemCard}>
            <strong>{food.name}</strong> – {food.status}
          </div>
        ))}

        <Link to="/ngo/booked">
          <button style={btnAlt}>View Booked Food</button>
        </Link>
      </section>

      <section style={quoteBox}>
        “No one has ever become poor by giving.” – Anne Frank
      </section>
    </div>
  );
}

/* COMPONENT */
function StatBox({ title, value }) {
  return (
    <div style={statBox}>
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  );
}

/* STYLES */
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
  background: "#f1f8e9",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  fontWeight: "bold"
};

const section = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "12px",
  marginBottom: "30px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
};

const sectionAlt = {
  ...section,
  background: "#f9fbff"
};

const itemCard = {
  padding: "12px",
  borderBottom: "1px solid #ddd"
};

const btn = {
  marginTop: "15px",
  padding: "10px 18px",
  background: "#2e7d32",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const btnAlt = {
  marginTop: "15px",
  padding: "10px 18px",
  background: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const quoteBox = {
  marginTop: "40px",
  padding: "30px",
  background: "linear-gradient(135deg, #e3f2fd, #e8f5e9)",
  borderRadius: "12px",
  textAlign: "center",
  fontStyle: "italic",
  fontSize: "18px"
};
