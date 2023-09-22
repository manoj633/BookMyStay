import express from "express";
import Hotel from "../models/hotelModel.js";
import {
  addHotel,
  deleteHotelById,
  getHotelById,
  getHotels,
  updateHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.route("/").post(verifyAdmin, addHotel).get(getHotels);
router
  .route("/:id")
  .put(verifyAdmin, updateHotel)
  .delete(verifyAdmin, deleteHotelById)
  .get(getHotelById);

export default router;
