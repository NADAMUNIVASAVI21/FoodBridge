import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");

  const register = async () => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", res.user.uid), { email, role });
    alert("Registered! Login now.");
  };

  return (
    <div style={wrapper}>
      <div style={card}>
        <h2 style={title}>Create Account</h2>

        <input
          style={input}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          style={input}
          type="password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />

        <select style={input} onChange={e => setRole(e.target.value)}>
          <option value="donor">Donor</option>
          <option value="ngo">NGO</option>
        </select>

        <button style={btn} onClick={register}>
          Register
        </button>

        <p style={text}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

/* styles */

const wrapper = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to right, #defcf3ff, #dce6f1ff)"
};

const card = {
  background: "#fff",
  padding: "40px",
  width: "360px",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  textAlign: "center"
};

const title = {
  marginBottom: "20px",
  color: "#2c3e50"
};

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

const btn = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  background: "#2ecc71",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px"
};

const text = {
  marginTop: "15px",
  fontSize: "14px"
};
