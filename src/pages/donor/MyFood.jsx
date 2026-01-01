import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import Chat from "../../components/Chat";

export default function MyFood() {
  const [foods, setFoods] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    quantity: "",
    location: ""
  });
  const [activeNgo, setActiveNgo] = useState(null);

  const fetchFoods = async () => {
    const snap = await getDocs(collection(db, "foods"));
    setFoods(
      snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(f => f.donorId === auth.currentUser.uid)
    );
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const startEdit = (food) => {
    setEditId(food.id);
    setEditData({
      name: food.name || "",
      quantity: food.quantity || "",
      location: food.location || ""
    });
  };

  const updateFood = async (id) => {
    try {
      await updateDoc(doc(db, "foods", id), {
        name: editData.name,
        quantity: Number(editData.quantity),
        location: editData.location
      });

      setEditId(null);
      fetchFoods();
    } catch (error) {
      console.error(error);
      alert("Failed to update food");
    }
  };

  const deleteFood = async (id) => {
    if (confirm("Delete this food item?")) {
      await deleteDoc(doc(db, "foods", id));
      fetchFoods();
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Food Listings</h2>

      {foods.map(food => (
        <div
          key={food.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px"
          }}
        >
          {editId === food.id ? (
            <>
              <input
                type="text"
                value={editData.name}
                onChange={e =>
                  setEditData({ ...editData, name: e.target.value })
                }
                placeholder="Food name"
              />
              <br />

              <input
                type="number"
                value={editData.quantity}
                onChange={e =>
                  setEditData({ ...editData, quantity: e.target.value })
                }
                placeholder="Quantity"
              />
              <br />

              <input
                type="text"
                value={editData.location}
                onChange={e =>
                  setEditData({ ...editData, location: e.target.value })
                }
                placeholder="Location"
              />
              <br />

              <button
                onClick={() => updateFood(food.id)}
                disabled={!editData.name || !editData.quantity}
              >
                Save
              </button>

              <button onClick={() => setEditId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p><b>{food.name}</b></p>
              <p>Quantity: {food.quantity}</p>
              <p>Location: {food.location}</p>
              <p>Status: {food.status}</p>

              <button onClick={() => startEdit(food)}>Edit</button>
              <button onClick={() => deleteFood(food.id)}>Delete</button>

              {food.status === "booked" && food.bookedBy && (
                <button onClick={() => setActiveNgo(food.bookedBy)}>
                  Chat with NGO
                </button>
              )}
            </>
          )}
        </div>
      ))}

      {activeNgo && (
        <Chat donorId={auth.currentUser.uid} ngoId={activeNgo} />
      )}
    </div>
  );
}
