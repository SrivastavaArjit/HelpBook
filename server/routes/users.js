import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
import axios from "axios";
import passport from "passport";
import dotenv from "dotenv";
import {
  loginUser,
  registerUser,
  getProfile,
} from "../controller/authController.js";

dotenv.config();

const router = express.Router();

// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;

  // Check if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message
    response = {
      "text": `You sent the message: "${received_message.text}". Now send me an attachment!`,
    };
  } else if (received_message.attachments) {
    //Gets the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [
            {
              "title": "Is this the right picture?",
              "subtitle": "Tap a button to answer.",
              "image_url": attachment_url,
              "buttons": [
                {
                  "type": "postback",
                  "title": "Yes!",
                  "payload": "yes",
                },
                {
                  "type": "postback",
                  "title": "No!",
                  "payload": "no",
                },
              ],
            },
          ],
        },
      },
    };
  }

  // Sends the response message
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === "yes") {
    response = { "text": "Thanks!" };
  } else if (payload === "no") {
    response = { "text": "Oops, try sending another image." };
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid,
    },
    "message": response,
  };

  //Send the HTTP request to the Messenger Platform
  axios({
    method: "POST",
    url: "https://graph.facebook.com/v19.0/me/messages",
    params: { "access_token": process.env.FACEBOOK_PAGE_ACCESS_TOKEN },
    headers: {
      "Content-Type": "application/json",
    },
    data: request_body,
  })
    .then((response) => {
      console.log(response);
      console.log("message sent!");
    })
    .catch((error) => {
      console.log("Unable to send message: " + error);
    });
}

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
    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Return a '200 OK' response to all events
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
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
