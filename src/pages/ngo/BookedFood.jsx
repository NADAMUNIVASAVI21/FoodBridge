import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Chat from "../../components/Chat";
import MapView from "../../components/MapView";

export default function BookedFood() {
  const [foods, setFoods] = useState([]);
  const [activeDonor, setActiveDonor] = useState(null);

  const fetchBookedFood = async () => {
    const snap = await getDocs(collection(db, "foods"));

    const booked = snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .filter(
        f =>
          f.status === "booked" &&
          f.bookedBy === auth.currentUser.uid
      );

    setFoods(booked);
  };

  useEffect(() => {
    fetchBookedFood();
  }, []);

  // ✅ Mark as picked
  const markPickedUp = async (foodId) => {
    await updateDoc(doc(db, "foods", foodId), {
      status: "picked",
      pickedAt: new Date()
    });

    alert("Food marked as picked up ✅");
    fetchBookedFood();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Booked Food</h2>

      {foods.length === 0 && <p>No booked food yet.</p>}

      {foods.map(food => (
        <div
          key={food.id}
          style={{
            border: "1px solid #ddd",
            padding: "18px",
            borderRadius: "10px",
            marginBottom: "20px",
            background: "#fff"
          }}
        >
          <h3>{food.name}</h3>

          <p><b>Quantity:</b> {food.quantity}</p>

          {food.coordinates && (
            <MapView location={food.coordinates} />
          )}

          <div style={{ marginTop: 12, display: "flex", gap: "10px" }}>
            <button
              onClick={() => setActiveDonor(food.donorId)}
              style={chatBtn}
            >
              💬 Chat with Donor
            </button>

            <button
              onClick={() => markPickedUp(food.id)}
              style={pickupBtn}
            >
              ✅ Picked Up
            </button>
          </div>
        </div>
      ))}

      {activeDonor && (
        <div style={{ marginTop: 30 }}>
          <h3>Chat</h3>
          <Chat donorId={activeDonor} ngoId={auth.currentUser.uid} />
        </div>
      )}
    </div>
  );
}

/* styles */

const chatBtn = {
  padding: "10px 14px",
  background: "#1565c0",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const pickupBtn = {
  padding: "10px 14px",
  background: "#2e7d32",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};
