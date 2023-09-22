import express from "express";
import Hotel from "../models/hotelModel.js";
import {
  addHotel,
  deleteHotelById,
  getHotelById,
  getHotels,
  updateHotel,
} from "../controllers/hotelController.js";

const router = express.Router();

router.route("/").post(addHotel).get(getHotels);
router.route("/:id").put(updateHotel).delete(deleteHotelById).get(getHotelById);

export default router;
