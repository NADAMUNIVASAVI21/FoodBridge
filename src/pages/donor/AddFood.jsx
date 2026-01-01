import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { analyzeFood } from "../../ai/foodAI";

export default function AddFood() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [coords, setCoords] = useState(null);
  const [image, setImage] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 📍 Live location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        alert("Location captured successfully");
      },
      () => alert("Please allow location access")
    );
  };

  // 🤖 AI analysis
  const handleAI = async () => {
    if (!name) return alert("Enter food name first");

    setLoading(true);
    try {
      const res = await analyzeFood(name);
      setAiData(res);
    } catch {
      alert("AI analysis failed");
    }
    setLoading(false);
  };

  // 📷 Upload image to Firebase Storage
  const uploadImage = async () => {
    if (!image) return null;

    const imageRef = ref(
      storage,
      `foods/${auth.currentUser.uid}_${Date.now()}`
    );

    await uploadBytes(imageRef, image);
    return await getDownloadURL(imageRef);
  };

  // 💾 Save food
  const saveFood = async () => {
    if (!name || !quantity || !coords) {
      alert("Fill all fields and capture location");
      return;
    }

    const imageUrl = await uploadImage();

    await addDoc(collection(db, "foods"), {
      name,
      quantity,
      imageUrl,
      coordinates: coords,
      donorId: auth.currentUser.uid,
      status: "available",
      aiCategory: aiData?.category || "",
      aiUrgency: aiData?.urgency || "",
      aiPeople: aiData?.estimated_people || "",
      createdAt: serverTimestamp()
    });

    alert("Food added successfully!");
    navigate("/donor/myfood");
  };

  return (
    <div style={box}>
      <h2>Add Food</h2>

      <input
        style={input}
        placeholder="Food name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        style={input}
        placeholder="Quantity (e.g. 20 plates)"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />

      

      <button style={btnBlue} onClick={getLocation}>
        📍 Use Live Location
      </button>

      {coords && (
        <p style={{ color: "green" }}>
          Location saved ({coords.lat.toFixed(4)}, {coords.lng.toFixed(4)})
        </p>
      )}

      <button style={btnPurple} onClick={handleAI}>
        {loading ? "Analyzing..." : "Analyze with AI 🤖"}
      </button>

      {aiData && (
        <div style={aiBox}>
          <p><b>Category:</b> {aiData.category}</p>
          <p><b>Urgency:</b> {aiData.urgency}</p>
          <p><b>Estimated People:</b> {aiData.estimated_people}</p>
        </div>
      )}

      <button style={btnGreen} onClick={saveFood}>
        Save Food
      </button>
    </div>
  );
}

/* styles */
const box = {
  maxWidth: 600,
  margin: "30px auto",
  padding: 25,
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 10,
  borderRadius: 6,
  border: "1px solid #ccc"
};

const btnBlue = {
  width: "100%",
  padding: 10,
  background: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: 6,
  marginBottom: 10
};

const btnPurple = {
  width: "100%",
  padding: 10,
  background: "#6a1b9a",
  color: "white",
  border: "none",
  borderRadius: 6,
  marginBottom: 10
};

const btnGreen = {
  width: "100%",
  padding: 12,
  background: "#2e7d32",
  color: "white",
  border: "none",
  borderRadius: 8
};

const aiBox = {
  background: "#f3e5f5",
  padding: 12,
  borderRadius: 8,
  marginBottom: 10
};
