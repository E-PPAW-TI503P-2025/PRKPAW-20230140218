const presensi = require("../models/presensi");
const multer = require("multer");
const path = require("path");

// ===== MULTER SETUP =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

exports.upload = multer({ storage });

// ===== CHECK-IN =====
exports.CheckIn = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User tidak ditemukan" });
    }

    const userId = req.user.id;
    const { latitude, longitude } = req.body;

    const masihCheckin = presensi.find(p => p.userId === userId && !p.checkOut);

    if (masihCheckin) {
      return res.status(400).json({ message: "Sudah check-in, belum check-out!" });
    }

    const record = {
      userId,
      latitude,
      longitude,
      checkIn: new Date(),
      checkOut: null,
      buktiFoto: req.file ? req.file.filename : null
    };

    presensi.push(record);

    res.status(201).json({
      message: "Check-In berhasil",
      data: record
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ===== CHECK-OUT =====
exports.CheckOut = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User tidak ditemukan" });
    }

    const userId = req.user.id;

    const record = presensi.find(p => p.userId === userId && !p.checkOut);

    if (!record) {
      return res.status(404).json({ message: "Belum check-in hari ini" });
    }

    record.checkOut = new Date();

    res.json({
      message: "Check-Out berhasil",
      data: record
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
