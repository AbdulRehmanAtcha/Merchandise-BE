import express from "express";
import cors from "cors";
import bodyParser from "body-parser"

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json({}))
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(bodyParser.json());

import AdminRoutes from "./Routes/Admin.routes.js"
import UserRoutes from "./Routes/user.routes.js"

app.use("/api/v1/admin", AdminRoutes)
app.use("/api/v1", UserRoutes)

export { app };
