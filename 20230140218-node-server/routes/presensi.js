const express = require("express");
const router = express.Router();

const presensiController = require("../controllers/presensiController");
const { addUserData } = require("../middleware/permissionMiddleware");
const verifyToken = require("../middleware/verifyToken");

router.use(addUserData);

router.post(
  "/check-in",
  [verifyToken, presensiController.upload.single("buktiFoto")],
  presensiController.CheckIn
);

router.post("/check-out", verifyToken, presensiController.CheckOut);

module.exports = router;
