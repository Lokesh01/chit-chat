const express = require("express");
const { addMessage, getMessage } = require("../controllers/messageController");
const router = express.Router();
const {protect}  = require("../middleware/authMiddleware");

router.post("/addmssg", protect, addMessage);
router.post("/getmssg", protect, getMessage);

module.exports = router;
