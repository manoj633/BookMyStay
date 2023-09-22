import express from "express";
import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.route("/").get(verifyAdmin, getUsers);
router
  .route("/:id")
  .put(verifyUser, updateUser)
  .delete(verifyUser, deleteUserById)
  .get(verifyUser, getUserById);

export default router;
