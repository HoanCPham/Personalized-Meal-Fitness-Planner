import { useEffect, useState } from "react";
import { onUserChange } from "../lib/firebase";
import Login from "../pages/Login";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for Firebase auth state
  useEffect(() => {
    const unsub = onUserChange((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          background: "#0b0f0f",
          color: "#e6f1f1",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  // Show Login page if not signed in
  if (!user) return <Login />;

  // Otherwise show your main app (placeholder for now)
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        background: "#0b0f0f",
        color: "#e6f1f1",
      }}
    >
      <div>
        <h1>Welcome, {user.displayName}</h1>
        <p>You are signed in with {user.email}</p>
      </div>
    </div>
  );
}
