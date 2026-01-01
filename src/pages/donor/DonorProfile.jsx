import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function DonorProfile() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "foods"));
      const myFoods = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(f => f.donorId === auth.currentUser.uid);

      setFoods(myFoods);
    };
    load();
  }, []);

  const active = foods.filter(f => f.status === "available").length;
  const booked = foods.filter(f => f.status === "booked").length;

  return (
    <div style={page}>
      {/* PROFILE */}
      <div style={profileCard}>
        <div style={avatar}>👤</div>
        <h2>Donor Profile</h2>
        <p style={email}>{auth.currentUser.email}</p>
        <p style={subText}>
          Your generosity makes a real difference.
        </p>

        <div style={statsRow}>
          <Stat title="Total Donations" value={foods.length} />
          <Stat title="Available" value={active} />
          <Stat title="Booked" value={booked} />
        </div>
      </div>

      {/* DONATIONS */}
      <div style={section}>
        <h3 style={sectionTitle}>My Donations</h3>

        {foods.length === 0 && (
          <p style={emptyText}>No donations added yet.</p>
        )}

        {foods.map(food => (
          <div key={food.id} style={itemCard}>
            <div>
              <strong>{food.name}</strong>
              <div style={small}>{food.quantity}</div>
            </div>

            <span
              style={{
                ...badge,
                background:
                  food.status === "available"
                    ? "#c8e6c9"
                    : "#ffe0b2",
                color:
                  food.status === "available"
                    ? "#2e7d32"
                    : "#ef6c00"
              }}
            >
              {food.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Small component ---------- */
function Stat({ title, value }) {
  return (
    <div style={statBox}>
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  );
}

/* ---------- Styles ---------- */

const page = {
  maxWidth: 900,
  margin: "40px auto",
  padding: 20
};

const profileCard = {
  background: "linear-gradient(135deg,#e8f5e9,#f1f8e9)",
  padding: 30,
  borderRadius: 18,
  textAlign: "center",
  marginBottom: 35,
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
};

const avatar = {
  width: 90,
  height: 90,
  borderRadius: "50%",
  background: "#2e7d32",
  color: "white",
  fontSize: 42,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 10px"
};

const email = {
  color: "#555",
  marginBottom: 4
};

const subText = {
  color: "#777",
  fontSize: 14,
  marginBottom: 20
};

const statsRow = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
  gap: 16
};

const statBox = {
  background: "white",
  padding: 16,
  borderRadius: 14,
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const section = {
  background: "#ffffff",
  padding: 25,
  borderRadius: 16,
  boxShadow: "0 4px 14px rgba(0,0,0,0.08)"
};

const sectionTitle = {
  marginBottom: 15
};

const itemCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 14,
  borderBottom: "1px solid #eee"
};

const badge = {
  padding: "6px 14px",
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 600,
  textTransform: "capitalize"
};

const small = {
  fontSize: 13,
  color: "#777"
};

const emptyText = {
  color: "#777",
  fontStyle: "italic"
};
