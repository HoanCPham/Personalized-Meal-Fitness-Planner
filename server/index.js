import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5174;

// Simple test route
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    time: new Date().toISOString()
  });
});

app.get("/", (req, res) => {
  res.send("Server is running. Try /api/health");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
