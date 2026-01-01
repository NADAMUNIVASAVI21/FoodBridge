import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={container}>
      <div style={hero}>
        <h1 style={title}>FoodBridge 🍽️</h1>
        <p style={subtitle}>
          Connecting surplus food with those who need it the most.
          Reduce food waste. Feed lives. Build a better future.
        </p>

        <div style={btnGroup}>
          <Link to="/login">
            <button style={primaryBtn}>Login</button>
          </Link>

          <Link to="/register">
            <button style={secondaryBtn}>Register</button>
          </Link>
        </div>
      </div>

      <section style={section}>
        <h2>Why FoodBridge?</h2>
        <ul style={list}>
          <li>🌍 Reduce food wastage</li>
          <li>🤝 Connect donors with NGOs</li>
          <li>🍛 Help feed people in need</li>
          <li>📊 Transparent & trackable system</li>
          <li>💬 Direct communication via chat</li>
        </ul>
      </section>

      <section style={sectionAlt}>
        <h2>How It Works</h2>
        <div style={steps}>
          <div style={card}>1️⃣ Donors add surplus food</div>
          <div style={card}>2️⃣ NGOs view available food</div>
          <div style={card}>3️⃣ NGOs book food</div>
          <div style={card}>4️⃣ Chat & coordinate pickup</div>
        </div>
      </section>

      <footer style={footer}>
        <p>© 2025 FoodBridge • Together against hunger ❤️</p>
      </footer>
    </div>
  );
}

/* ---------- styles ---------- */

const container = {
  fontFamily: "Arial, sans-serif",
  textAlign: "center"
};

const hero = {
  padding: "80px 20px",
  background: "linear-gradient(to right, #e0fcf3ff, #d7e8f9ff)"
};

const title = {
  fontSize: "48px",
  marginBottom: "10px"
};

const subtitle = {
  fontSize: "18px",
  maxWidth: "600px",
  margin: "auto"
};

const btnGroup = {
  marginTop: "30px"
};

const primaryBtn = {
  padding: "14px 30px",
  fontSize: "16px",
  marginRight: "15px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#ffffff",
  color: "#185a9d",
  fontWeight: "bold"
};

const secondaryBtn = {
  padding: "14px 30px",
  fontSize: "16px",
  border: "2px solid white",
  borderRadius: "8px",
  cursor: "pointer",
  background: "transparent",
  
};

const section = {
  padding: "60px 20px",
  background: "#f9f9f9"
};

const sectionAlt = {
  padding: "60px 20px",
  background: "#ffffff"
};

const list = {
  listStyle: "none",
  padding: 0,
  fontSize: "18px",
  lineHeight: "2"
};

const steps = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  flexWrap: "wrap",
  marginTop: "30px"
};

const card = {
  padding: "20px",
  width: "220px",
  borderRadius: "10px",
  background: "#f1f1f1",
  fontWeight: "bold"
};

const footer = {
  background: "#222",
  color: "white",
  padding: "20px",
  marginTop: "40px"
};
