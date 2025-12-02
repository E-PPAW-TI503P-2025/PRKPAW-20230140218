const express = require('express');
const router = express.Router();

const reportController = require('../controllers/reportController');
const verifyToken = require('../middleware/verifyToken');
const { addUserData, isAdmin } = require('../middleware/permissionMiddleware');

router.get(
  '/daily',
  [verifyToken, addUserData, isAdmin],
  reportController.getDailyReport
);

module.exports = router;
