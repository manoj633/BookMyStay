import express from "express";

const router = express.Router();

router.get("/", () => {
  console.log("user is logged in");
});

export default router;
