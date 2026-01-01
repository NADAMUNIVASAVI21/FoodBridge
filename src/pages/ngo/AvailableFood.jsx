import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import MapView from "../../components/MapView";
import Chat from "../../components/Chat";

export default function AvailableFood() {
  const [foods, setFoods] = useState([]);
  const [activeDonor, setActiveDonor] = useState(null);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    const snap = await getDocs(collection(db, "foods"));
    const list = snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .filter(f => f.status === "available");

    setFoods(list);
  };

  const bookFood = async (id) => {
    await updateDoc(doc(db, "foods", id), {
      status: "booked",
      bookedBy: auth.currentUser.uid
    });

    alert("Food booked successfully");
    fetchFoods();
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Available Food</h2>

      {foods.map(food => (
        <div key={food.id} style={card}>
          <h3>{food.name}</h3>
          <p><b>Quantity:</b> {food.quantity}</p>

          {food.coordinates && (
            <MapView location={food.coordinates} />
          )}

          <div style={{ marginTop: 10, display: "flex", gap: "10px" }}>
            <button
              style={bookBtn}
              onClick={() => bookFood(food.id)}
            >
              Book Food
            </button>

            <button
              style={chatBtn}
              onClick={() => setActiveDonor(food.donorId)}
            >
              Chat
            </button>
          </div>
        </div>
      ))}

      {activeDonor && (
        <div style={{ marginTop: 30 }}>
          <Chat donorId={activeDonor} ngoId={auth.currentUser.uid} />
        </div>
      )}
    </div>
  );
}

const card = {
  background: "#fff",
  padding: 20,
  marginBottom: 25,
  borderRadius: 12,
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

const bookBtn = {
  padding: "10px 14px",
  background: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
};

const chatBtn = {
  padding: "10px 14px",
  background: "#6a1b9a",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
};
