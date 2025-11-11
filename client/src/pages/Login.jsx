import { useEffect, useState } from "react";
import { loginWithGoogle, logout, onUserChange } from "../lib/firebase";

export default function Login() {
  const [user, setUser] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => onUserChange(setUser), []);

  const handleGoogle = async () => {
    setMsg(""); setBusy(true);
    try {
      await loginWithGoogle();
      setMsg("Signed in with Google");
    } catch (e) {
      console.error(e);
      setMsg(e?.message || "Google sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={wrap}>
      <div style={card}>
        <h1 style={{ margin: 0, fontSize: 22 }}>Sign in</h1>
        <p style={{ margin: "6px 0 20px", opacity: 0.8 }}>Use your Google account</p>

        {!user ? (
          <button onClick={handleGoogle} disabled={busy} style={primaryBtn}>
            {busy ? "Signing in..." : "Continue with Google"}
          </button>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {user.photoURL && (
                <img src={user.photoURL} alt="" width={44} height={44} style={{ borderRadius: "50%" }} />
              )}
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ fontWeight: 600 }}>{user.displayName || "Google user"}</div>
                <div style={{ fontSize: 13, opacity: 0.8 }}>{user.email}</div>
              </div>
            </div>
            <button onClick={logout} style={ghostBtn}>Sign out</button>
          </div>
        )}

        {msg && <div style={{ marginTop: 12, fontSize: 13, color: "#97f3c9" }}>{msg}</div>}

        {/* tip line */}
        <div style={{ marginTop: 16, fontSize: 12, opacity: 0.7 }}>
          Trouble logging in? Allow pop-ups for localhost or try an incognito window.
        </div>
      </div>
    </div>
  );
}

const wrap = {
  minHeight: "100dvh",
  display: "grid",
  placeItems: "center",
  background: "#0b0f0f",
  color: "#e6f1f1",
};

const card = {
  width: "100%",
  maxWidth: 420,
  background: "#121618",
  border: "1px solid #1e2426",
  borderRadius: 16,
  padding: 24,
  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
};

const primaryBtn = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #2a3336",
  background: "#1f8b6d",
  color: "white",
  cursor: "pointer",
};

const ghostBtn = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #2a3336",
  background: "transparent",
  color: "#e6f1f1",
  cursor: "pointer",
};
