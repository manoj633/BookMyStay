import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  addRoom,
  deleteRoomById,
  getRoomById,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/roomController.js";

const router = express.Router();

router.route("/:hotelid").post(verifyAdmin, addRoom);
router.route("/").get(getRooms);
router.route("/:id/:hotelid").delete(verifyAdmin, deleteRoomById);
router.route("/:id").put(verifyAdmin, updateRoom).get(getRoomById);
router.route("/availability/:id").put(updateRoomAvailability);
export default router;
