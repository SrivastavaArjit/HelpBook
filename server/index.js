import express, { urlencoded } from "express";
import cors from "cors";
import userRouter from "./routes/users.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";
import FacebookStrategy from "passport-facebook";
import session from "express-session";
import User from "./models/User.js";

dotenv.config();

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const app = express();

app.use(urlencoded({ extended: true }));
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(cookieParser());
app.use(
  session({ secret: "guacamole", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.MONGODB_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log(error);
  }
  //    finally {
  //     // Ensures that the client will close when you finish/error
  //     await mongoose.disconnect();
  //   }
}
run().catch(console.dir);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/users/auth/facebook/callback",
      // profileFields: [
      //   "id",
      //   "name",
      //   "displayName",
      //   "gender",
      //   "photos",
      //   "birthday ",
      //   "email",
      // ],
    },
    function (accessToken, refreshToken, profile, cb) {
      process.nextTick(async () => {
        try {
          const userData = await User.findOne({ uid: profile.id });
          console.log(profile, accessToken);
          if (userData) {
            console.log("User Found");
            console.log("User Data: ", userData);
            return cb(null, userData);
          } else {
            console.log("Inside else to create new User...");
            // var newUser = new User();
            // newUser.uid = profile.id;
            // (newUser.name =
            //   profile.name.givenName + " " + profile.name.familyName),
            //   (newUser.email = profile.emails[0].value);
            // newUser.gender = profile.gender;
            // newUser.birthday = profile._json.brithday;
            // newUser.save();
            return cb(null, profile);
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser(async (id, cb) => {
  try {
    // const user = await User.find({ uid: id });

    cb(null, id);
  } catch (err) {
    console.log("DeserailizeUserError: ", err);
  }
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/fail", (req, res) => {
  res.redirect("http://localhost:5173/login");
});

app.get("/success", (req, res) => {
  // res.redirect("http://localhost:5173/agent");

  res.json(req.user);
});

app.use("/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running at port 3000");
});
