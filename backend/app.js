import express from "express";
import cors from "cors";

const app = express(); // Initialize the Express application

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Food Delivery API");
});

export default app;
