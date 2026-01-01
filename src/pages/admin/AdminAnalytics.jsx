import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

// ---------------- STAT CARD ----------------
function Stat({ title, value }) {
  return (
    <div style={statBox}>
      <h3>{title}</h3>
      <p style={{ fontSize: "26px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

// ---------------- MAIN COMPONENT ----------------
export default function AdminAnalytics() {
  const [users, setUsers] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersSnap = await getDocs(collection(db, "users"));
      const foodsSnap = await getDocs(collection(db, "foods"));

      setUsers(usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setFoods(foodsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []);

  // COUNTS
  const donors = users.filter(u => u.role === "donor").length;
  const ngos = users.filter(u => u.role === "ngo").length;

  const available = foods.filter(f => f.status === "available").length;
  const booked = foods.filter(f => f.status === "booked").length;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Analytics Dashboard</h1>

      {/* SUMMARY */}
      <div style={grid}>
        <Stat title="Total Users" value={users.length} />
        <Stat title="Donors" value={donors} />
        <Stat title="NGOs" value={ngos} />
        <Stat title="Total Food Items" value={foods.length} />
        <Stat title="Available Food" value={available} />
        <Stat title="Booked Food" value={booked} />
      </div>

      {/* PIE CHARTS */}
      <div style={chartRow}>
        <div style={chartBox}>
          <h3>User Distribution</h3>
          <Pie
            data={{
              labels: ["Donors", "NGOs"],
              datasets: [
                {
                  data: [donors, ngos],
                  backgroundColor: ["#90fa94ff", "#a6d5feff"]
                }
              ]
            }}
          />
        </div>

        <div style={chartBox}>
          <h3>Food Status</h3>
          <Pie
            data={{
              labels: ["Available", "Booked"],
              datasets: [
                {
                  data: [available, booked],
                  backgroundColor: ["#a3fba9ff", "#f9d19aff"]
                }
              ]
            }}
          />
        </div>
      </div>

      {/* BAR CHART */}
      <div style={{ maxWidth: "700px", marginTop: "40px" }}>
        <h3>Food Distribution</h3>
        <Bar
          data={{
            labels: ["Available", "Booked"],
            datasets: [
              {
                label: "Food Count",
                data: [available, booked],
                backgroundColor: ["#92f695ff", "#facf8eff"]
              }
            ]
          }}
        />
      </div>

      {/* FOOD TABLE */}
      <h2 style={{ marginTop: "50px" }}>All Food Records</h2>

      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Food</th>
              <th style={thTdStyle}>Quantity</th>
              <th style={thTdStyle}>Location</th>
              <th style={thTdStyle}>Status</th>
              <th style={thTdStyle}>Donor ID</th>
              <th style={thTdStyle}>Booked By (NGO)</th>
            </tr>
          </thead>

          <tbody>
            {foods.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No food records found
                </td>
              </tr>
            )}

            {foods.map(food => (
              <tr key={food.id}>
                <td style={thTdStyle}>{food.name}</td>
                <td style={thTdStyle}>{food.quantity}</td>
                <td style={thTdStyle}>{food.location}</td>
                <td style={thTdStyle}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      color: "white",
                      fontSize: "12px",
                      background:
                        food.status === "available" ? "#97f69bff" : "#f5ca9dff"
                    }}
                  >
                    {food.status}
                  </span>
                </td>
                <td style={{ ...thTdStyle, fontSize: "12px" }}>
                  {food.donorId}
                </td>
                <td style={{ ...thTdStyle, fontSize: "12px" }}>
                  {food.bookedBy || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "20px",
  marginBottom: "40px"
};

const chartRow = {
  display: "flex",
  gap: "40px",
  flexWrap: "wrap",
  marginBottom: "40px"
};

const chartBox = {
  width: "350px",
  background: "#e7fbf8ff",
  padding: "20px",
  borderRadius: "10px"
};

const statBox = {
  padding: "20px",
  borderRadius: "10px",
  background: "#e2f8f7ff",
  textAlign: "center"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#ecfbf5ff",
  borderRadius: "8px",
  overflow: "hidden"
};

const thTdStyle = {
  border: "1px solid #3a564eff",
  padding: "10px",
  textAlign: "center"
};
