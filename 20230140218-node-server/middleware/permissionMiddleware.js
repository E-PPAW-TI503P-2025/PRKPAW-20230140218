/* middleware/permissionMiddleware.js */

// Middleware untuk menambahkan user dari JWT (TIDAK mengubah req.user)
module.exports.addUserData = (req, res, next) => {
  // Di tahap ini req.user sudah di-set oleh verifyToken
  // Jadi jangan di-override seperti sebelumnya.
  
  if (!req.user) {
    return res.status(401).json({
      message: "User belum login"
    });
  }

  next();
};

// Middleware untuk role admin
module.exports.isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "User belum login" });
  }

  // Case-insensitive untuk keamanan
  if (req.user.role && req.user.role.toLowerCase() === "admin") {
    return next();
  }

  return res.status(403).json({
    message: "Akses ditolak: hanya admin"
  });
};
