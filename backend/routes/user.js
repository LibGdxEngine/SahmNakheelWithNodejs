const express = require("express");
const router = express.Router();

const {
  authMiddleware,
  requireSignIn,
  adminMiddleware,
  logUserBehavior,
} = require("../controllers/auth");
const {
  read,
  publicProfile,
  update,
  photo,
  searchUser,
  getMyNotifications,
  sendNotification,
  readNotification,
  initateCheckout,
} = require("../controllers/user");

router.post(
  "/user/read-notification",
  requireSignIn,
  authMiddleware,
  readNotification
);
router.post(
  "/user/my-notifications",
  requireSignIn,
  authMiddleware,
  getMyNotifications
);

router.get("/user/profile", requireSignIn, authMiddleware, read);

router.get("/user/:username", publicProfile);
router.put("/user/update", requireSignIn, authMiddleware, update);
router.get("/user/photo/:username", photo);

router.post(
  "/user/send-notification",
  requireSignIn,
  authMiddleware,
  sendNotification
);

router.post(
  "/user/initate-checkout",

  initateCheckout
);
//Admin operations

router.post("/users/search", requireSignIn, adminMiddleware, searchUser);

module.exports = router;
