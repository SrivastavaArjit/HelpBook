import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
import passport from "passport";
import dotenv from "dotenv";
import {
  loginUser,
  registerUser,
  getProfile,
} from "../controller/authController.js";

dotenv.config();

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", getProfile);

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: [
      "email",
      "pages_show_list",
      "pages_manage_metadata",
      "pages_messaging",
      "pages_read_engagement",
      "public_profile",
    ],
  })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/fail" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/success");
  }
);

router.post("/facebook/webhook", (req, res) => {
  let body = req.body;
  console.log(`\u{1F7EA} Received webhook:`);
  console.dir(body, { depth: null });
  if (body.object === "page") {
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

router.get("/messaging-webhook", (req, res) => {
  console.log("get endpoint URL..");
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  console.log(process.env.WEBHOOK_VERIFY_TOKEN);
  console.log(`Token: ${token}, Mode: ${mode}, Challenge: $`);

  if (mode && token) {
    if (mode === "subscribe" && token === process.env.WEBHOOK_VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
      // res.status(200).send("HI there");
    } else {
      res.sendStatus(403);
    }
  }
});
export default router;
