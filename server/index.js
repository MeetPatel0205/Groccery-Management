import express from "express";
import dotenv from "dotenv";
import { mongoDB } from "./db.js";
import cors from "cors";
import { router } from "./routes/userRoute.js"

dotenv.config();
mongoDB();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/", router);

app.get("/getid", (req, res) => {
  res.status(200).json({
    key_id: process.env.RAZORPAY_KEY,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Is Started At ${PORT}`);
});
