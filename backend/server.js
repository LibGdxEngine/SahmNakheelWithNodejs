const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Notification = require("./models/Notifications");
require("dotenv").config();

let URL = "";
if (process.env.NODE_ENV === "development") {
  URL = process.env.CLIENT_URL_DEVELOPMENT;
} else {
  URL = process.env.CLIENT_URL_PRODUCTION;
}
//bring routes

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//app
const app = express();
const http = require("http").Server(app);

const socketIO = require("socket.io")(http, {
  cors: {
    origin: URL,
  },
});

// When a new client connects
socketIO.on("connection", (socket) => {});

//db
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true })
  .then(() => console.log("connected"))
  .catch((e) => console.log(e));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" })); // Increase JSON data limit
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Increase form data limit

if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "http://localhost:3000" }));
} else {
  app.use(
    cors({ origin: "https://letaskono-zwaj.com", optionsSuccessStatus: 200 })
  );
}



//routes middlewares
app.use("/api", authRoutes);
app.use("/api", userRoutes);

// app.get("/api/notifications/:userId", (req, res) => {
//   const userId = req.params.userId;

//   // Set up headers for SSE
//   res.writeHead(200, {
//     "Content-Type": "text/event-stream",
//     "Cache-Control": "no-cache",
//     Connection: "keep-alive",
//   });

//   // Create a MongoDB change stream to listen for new notifications for this user
//   const changeStream = Notification.watch({
//     fullDocument: "updateLookup",
//     pipeline: [
//       { $match: { operationType: "insert", "fullDocument.userId": userId } },
//     ],
//   });
//   changeStream.on("change", (change) => {
//     const notification = change.fullDocument;
//     // res.write(`data: ${notification.message}\n\n`);
//   });

//   // Send any pending notifications for this user
//   Notification.find({ userId, read: false }, (err, notifications) => {
//     if (err) {
//       console.error(err);
//       return res.sendStatus(500);
//     }

//     notifications.forEach((notification) => {
//       res.write(`data: ${JSON.stringify(notification)}\n\n`);
//     });
//   });
// });

// app.post("/api/notifications/:userId", (req, res) => {
//   const userId = req.params.userId;
//   const message = req.body.message;
//   const link = req.body.link;
//   // Save the notification to the database
//   const notification = new Notification({ userId, message, link });
//   notification.save((err) => {
//     if (err) {
//       console.error(err);
//       return res.sendStatus(500);
//     }
//     res.sendStatus(200);
//   });
// });

// app.put("/api/notifications/read", (req, res) => {
//   const id = req.body.id;

//   const update = { read: true, message: "" };
//   Notification.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(id) }, update, {
//     new: true,
//   }).then((data, err) => {
//     if (err) {
//       return res.sendStatus(500);
//     }

//     res.sendStatus(200);
//   });
// });

const port = process.env.PORT || 8000;

http.timeout = 60000;

http.listen(port, () => console.log(`Listening on port ${port}`));
