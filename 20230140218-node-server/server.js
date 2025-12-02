const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));

// Logging Tambahan
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// ===== 🔥 Import Middleware JWT & Role =====
const verifyToken = require("./middleware/verifyToken");
const { addUserData } = require("./middleware/permissionMiddleware");

// ===== 🔥 Pasang middleware untuk SEMUA route kecuali auth =====
app.use("/api/presensi", verifyToken, addUserData);
app.use("/api/reports", verifyToken, addUserData);

// ==== Auth route tidak butuh verifyToken ====
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// ===== Routes =====
const presensiRoutes = require("./routes/presensi");
const reportRoutes = require("./routes/report");

app.use("/api/presensi", presensiRoutes);
app.use("/api/reports", reportRoutes);

// ===== 404 Handler =====
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

// ===== Global Error =====
app.use((err, req, res, next) => {
  console.error("Terjadi error:", err.stack);
  res.status(500).json({ message: "Terjadi kesalahan pada server" });
});

// ===== Start =====
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
});
