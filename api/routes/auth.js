import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, This is auth endpoint");
});

router.get("/register", (req, res) => {
  res.send("Hello, This is register endpoint");
});

export default router;
