import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export default function NgoProfile() {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!auth.currentUser) return;

      const userSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
      setProfile(userSnap.exists() ? userSnap.data() : null);

      const snap = await getDocs(collection(db, "foods"));
      const booked = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(f => f.bookedBy === auth.currentUser.uid);

      setOrders(booked);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: 40 }}>Loading profile...</p>;
  }

  return (
    <div style={page}>
      {/* PROFILE HEADER */}
      <div style={profileCard}>
        <div style={avatar}>🏢</div>
        <h2>NGO Profile</h2>

        <p style={email}>
          {profile?.email || "Email not available"}
        </p>

        <p style={subText}>Helping fight hunger together</p>

        <div style={statsRow}>
          <Stat title="Total Orders" value={orders.length} />
          <Stat
            title="Picked Up"
            value={orders.filter(o => o.status === "picked").length}
          />
          <Stat
            title="Pending"
            value={orders.filter(o => o.status !== "picked").length}
          />
        </div>
      </div>

      {/* ORDERS */}
      <div style={section}>
        <h3 style={sectionTitle}>My Orders</h3>

        {orders.length === 0 && (
          <p style={emptyText}>No orders yet.</p>
        )}

        {orders.map(o => (
          <div key={o.id} style={itemCard}>
            <div>
              <strong>{o.name}</strong>
              <div style={small}>{o.quantity}</div>
            </div>

            <span
              style={{
                ...badge,
                background:
                  o.status === "picked" ? "#c8e6c9" : "#fff3cd",
                color:
                  o.status === "picked" ? "#2e7d32" : "#b26a00"
              }}
            >
              {o.status || "booked"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Small reusable component ---------- */
function Stat({ title, value }) {
  return (
    <div style={statBox}>
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  );
}

/* ---------- STYLES ---------- */

const page = {
  maxWidth: 900,
  margin: "40px auto",
  padding: 20
};

const profileCard = {
  background: "linear-gradient(135deg,#e3f2fd,#f1f8e9)",
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
  background: "#1976d2",
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
