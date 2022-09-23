import express from "express";
import session from "express-session";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import "dotenv/config";
import { port, hostname, localClientURL } from "./config/index.js";
import gameRouter from "./routes/game.js";
import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";
import pastriesRouter from "./routes/pastries.js";

const app = express();

mongoose
  .connect(process.env.APP_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // options qui évitent des warnings inutiles
  })
  .then(init)
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: localClientURL,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.APP_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //   maxAge: 1000 * 60 * 60 * 24 * 7, // 1 semaine
    // },
  })
);
app.use(express.json());
async function init() {
  app.get("/", (_, res) => {
    res.send("Hello World !");
  });

  app.use("/game/", gameRouter);
  app.use("/user/", userRouter);
  app.use("/pastries/", pastriesRouter);
  app.use("/admin/", adminRouter);
}

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
