import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Login({ setShowSplash }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    if (email === "admin" && password === "9182359629") {
      setShowSplash(true);
      setTimeout(() => nav("/admin"), 3000);
      return;
    }

    const res = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, "users", res.user.uid));

    setShowSplash(true);
    setTimeout(() => {
      snap.data().role === "donor" ? nav("/donor") : nav("/ngo");
    }, 3000);
  };

  return (
    <div style={wrapper}>
      <div style={card}>
        <h2 style={title}>Welcome Back</h2>

        <input
          style={input}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button style={btn} onClick={login}>
          Login
        </button>

        <p style={text}>
          Don’t have an account? <a href="/register">Register</a>
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
  background: "linear-gradient(to right, #cdf9ebff, #dcedfdff)"
};

const card = {
  background: "#fff",
  padding: "40px",
  width: "360px",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.15",
  textAlign: "center"
};

const title = {
  marginBottom: "20px",
  color: "#333"
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
  background: "#ff9800",
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
