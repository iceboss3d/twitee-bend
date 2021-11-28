import express from "express";
import { connect } from "./db/connect.js";
import apiRouter from "./routes/api.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", apiRouter);

app.listen(port, () => {
  console.log("App listening on port " + port);
  connect();
});

export default app;
