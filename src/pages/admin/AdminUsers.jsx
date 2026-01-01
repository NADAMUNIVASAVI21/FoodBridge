import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const snap = await getDocs(collection(db, "users"));
    setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBlock = async (user) => {
    await updateDoc(doc(db, "users", user.id), {
      blocked: !user.blocked
    });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;

    await deleteDoc(doc(db, "users", id));
    fetchUsers();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>User Management</h2>

      {users.map(user => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "6px"
          }}
        >
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>
          <p><b>Status:</b> {user.blocked ? "Blocked" : "Active"}</p>

          <button
            onClick={() => toggleBlock(user)}
            style={{
              marginRight: "10px",
              background: user.blocked ? "#4caf50" : "#f44336",
              color: "white",
              border: "none",
              padding: "8px 14px",
              cursor: "pointer"
            }}
          >
            {user.blocked ? "Unblock" : "Block"}
          </button>

          <button
            onClick={() => deleteUser(user.id)}
            style={{
              background: "#000",
              color: "white",
              padding: "8px 14px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
