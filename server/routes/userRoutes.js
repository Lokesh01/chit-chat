const express = require("express");
const {
  registerUser,
  loginUser,
  setAvatar,
  getAllUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/setavatar/:id", setAvatar);
router.get("/allusers/:id", protect, getAllUsers);

module.exports = router;
