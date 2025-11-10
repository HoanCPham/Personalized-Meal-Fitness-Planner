import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Import Firebase helpers
import { loginWithGoogle, logout, onUserChange } from "./lib/firebase";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  // Watch for Firebase auth state changes
  useEffect(() => {
    return onUserChange(setUser);
  }, []);

  // Read your Firebase Project ID from .env
  const projectId = import.meta.env.VITE_FB_PROJECT_ID;
  console.log("Firebase Project ID:", projectId);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Meal Fitness Planner</h1>

      {/* Firebase Project ID Display */}
      <p style={{ color: "limegreen", marginBottom: "20px" }}>
        Firebase Project ID: <strong>{projectId}</strong>
      </p>

      {/* Firebase Google Sign-in Section */}
      {user ? (
        <>
          <p>Signed in as: {user.displayName}</p>
          <img
            src={user.photoURL}
            alt="User"
            style={{ width: "60px", borderRadius: "50%" }}
          />
          <br />
          <button onClick={logout} style={{ marginTop: "10px" }}>
            Sign out
          </button>
        </>
      ) : (
        <button onClick={loginWithGoogle}>Sign in with Google</button>
      )}

      {/* Keep Vite Counter Example (optional) */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
