/* controllers/presensiController.js */

const { Presensi } = require("../models");

exports.CheckIn = async (req, res) => {
  try {
    // Validasi user dari middleware
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "User tidak ditemukan pada request"
      });
    }

    const userId = req.user.id;
    const { latitude, longitude } = req.body;
    const waktuSekarang = new Date();

    // Cek apakah user sudah check-in (belum check-out)
    const existingRecord = await Presensi.findOne({
      where: { userId, checkOut: null }
    });

    if (existingRecord) {
      return res.status(400).json({
        message: "Anda sudah melakukan check-in hari ini"
      });
    }

    // Simpan presensi
    const newPresensi = await Presensi.create({
      userId,
      checkIn: waktuSekarang,
      latitude,
      longitude
    });

    return res.status(201).json({
      message: "Check-In berhasil",
      data: newPresensi
    });

  } catch (error) {
    console.log("CHECK-IN ERROR:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message
    });
  }
};


exports.CheckOut = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "User tidak ditemukan pada request"
      });
    }

    const userId = req.user.id;
    const waktuSekarang = new Date();

    // Cari presensi yang belum checkout
    const presensi = await Presensi.findOne({
      where: { userId, checkOut: null }
    });

    if (!presensi) {
      return res.status(404).json({
        message: "Anda belum melakukan check-in hari ini"
      });
    }

    presensi.checkOut = waktuSekarang;
    await presensi.save();

    return res.json({
      message: "Check-Out berhasil",
      data: presensi
    });

  } catch (error) {
    console.log("CHECK-OUT ERROR:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message
    });
  }
};
