import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

const { Pool } = pkg;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, 
  },
});

pool.connect()
  .then(() => console.log("✅ Connected to NeonDB (PostgreSQL)"))
  .catch((err: any) => console.error("❌ DB Connection Error:", err));

app.get("/health", (req, res) => res.send("Server is healthy"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
