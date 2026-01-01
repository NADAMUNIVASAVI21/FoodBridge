import { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Chat({ donorId, ngoId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  // Unique chat room ID
  const chatId =
    donorId < ngoId ? `${donorId}_${ngoId}` : `${ngoId}_${donorId}`;

  // Fetch messages in real time
  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsubscribe();
  }, [chatId]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId: auth.currentUser.uid,
      text,
      createdAt: serverTimestamp()
    });

    setText("");
  };

  return (
    <div style={styles.chatBox}>
      <div style={styles.header}>Chat</div>

      <div style={styles.messages}>
        {messages.map((msg, i) => {
          const isMe = msg.senderId === auth.currentUser.uid;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: isMe ? "flex-end" : "flex-start",
                marginBottom: 8
              }}
            >
              <div
                style={{
                  ...styles.bubble,
                  background: isMe ? "#dcf8c6" : "#ffffff",
                  border: isMe ? "1px solid #b2e59f" : "1px solid #ddd"
                }}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

/* Inline styles (Instagram-like) */
const styles = {
  chatBox: {
    width: "100%",
    maxWidth: "500px",
    height: "500px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    background: "#f5f5f5"
  },

  header: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    fontWeight: "bold",
    textAlign: "center",
    background: "#ffffff"
  },

  messages: {
    flex: 1,
    padding: "10px",
    overflowY: "auto"
  },

  bubble: {
    padding: "8px 12px",
    borderRadius: "15px",
    maxWidth: "70%",
    fontSize: "14px"
  },

  inputBox: {
    display: "flex",
    padding: "8px",
    borderTop: "1px solid #ccc",
    background: "#fff"
  },

  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    outline: "none"
  },

  button: {
    marginLeft: "8px",
    padding: "8px 14px",
    borderRadius: "20px",
    border: "none",
    background: "#25D366",
    color: "white",
    cursor: "pointer"
  }
};
