import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [showHome, setShowHome] = useState(false);

  // Prevent scrolling while video is playing
  useEffect(() => {
    document.body.style.overflow = showHome ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showHome]);

  return (
    <>
      {/* VIDEO INTRO */}
      {!showHome && (
        <div style={styles.videoWrapper}>
          <video
            src="/mp.mp4"
            autoPlay
            muted
            playsInline
            onEnded={() => setShowHome(true)}
            style={styles.video}
          />
        </div>
      )}

      {/* MAIN HOME */}
      {showHome && (
        <div style={styles.container}>
          <div style={styles.hero}>
            
            <h1 style={styles.title}>Food Bridge</h1>
            <p style={styles.subtitle}>
              From Surplus to Sustenance:
              Reducing Food Wastage and Feeding the Hungry
            </p>

            <div style={styles.btnGroup}>
              <Link to="/login">
                <button style={styles.primaryBtn}>Login</button>
              </Link>

              <Link to="/register">
                <button style={styles.secondaryBtn}>Register</button>
              </Link>
            </div>
          </div>
          <section style={styles.section}>
            <h2>Why Food Bridge?</h2>
            <ul style={styles.list}>
              <li>🌍 Reduce Food Wastage</li>
              <li>🍛 Redistribute Food to Hungry and Needy</li>
              <li>🤝 Connect Donors with NGOs</li>
              <li>🍛 Quality-checked food delivery</li>
              <li>📊 Transparent & tracked system</li>
              <li>💬 Direct communication</li>
            </ul>
          </section>

          <section style={styles.sectionAlt}>
            <h2>How It Works</h2>
            <div style={styles.steps}>
              <div style={styles.card}>1️⃣ Donors add surplus food</div>
              <div style={styles.card}>2️⃣ NGOs browse food</div>
              <div style={styles.card}>3️⃣ NGOs reserve food</div>
              <div style={styles.card}>4️⃣ Chat & pickup</div>
            </div>
          </section>

          <footer style={styles.footer}>
            <p>© 2025 FoodBridge • Together against hunger ❤️</p>
          </footer>
        </div>
      )}
    </>
  );
}
const styles = {
  videoWrapper: {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    background: "black",
  },

  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover", // ✅ fills screen, no scroll
  },

  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },

  hero: {
    padding: "80px 20px",
    background: "linear-gradient(to right, #e0fcf3ff, #d7e8f9ff)",
  },

  title: {
    fontSize: "48px",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "18px",
    maxWidth: "600px",
    margin: "auto",
  },

  btnGroup: {
    marginTop: "30px",
  },

  primaryBtn: {
    padding: "14px 30px",
    fontSize: "16px",
    marginRight: "15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#ffffff",
    color: "#185a9d",
    fontWeight: "bold",
  },

  secondaryBtn: {
    padding: "14px 30px",
    fontSize: "16px",
    border: "2px solid white",
    borderRadius: "8px",
    cursor: "pointer",
    background: "transparent",
  },

  section: {
    padding: "60px 20px",
    background: "#f9f9f9",
  },

  sectionAlt: {
    padding: "60px 20px",
    background: "#ffffff",
  },

  list: {
    listStyle: "none",
    padding: 0,
    fontSize: "18px",
    lineHeight: "2",
  },

  steps: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "30px",
  },

  card: {
    padding: "20px",
    width: "220px",
    borderRadius: "10px",
    background: "#f1f1f1",
    fontWeight: "bold",
  },

  footer: {
    background: "#222",
    color: "white",
    padding: "20px",
    marginTop: "40px",
  },
  png: {
    width: "550px",
    marginBottom: "20px",
  },
};
