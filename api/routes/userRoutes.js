import express from "express";
import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.route("/").get(getUsers);
router
  .route("/:id")
  .put(verifyToken, updateUser)
  .delete(deleteUserById)
  .get(getUserById);

export default router;
