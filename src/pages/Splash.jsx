import { useEffect } from "react";
import "../styles/splash.css";

export default function Splash({ onFinish }) {
  useEffect(() => {
    const t = setTimeout(onFinish, 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="splash-container">
      <img src="/title.svg" className="splash-logo" />
    </div>
  );
}
