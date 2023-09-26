import express from "express";
import Hotel from "../models/hotelModel.js";
import {
  addHotel,
  countByCity,
  countByType,
  deleteHotelById,
  getHotelById,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.route("/").post(verifyAdmin, addHotel).get(getHotels);
router
  .route("/:id")
  .put(verifyAdmin, updateHotel)
  .delete(verifyAdmin, deleteHotelById);

router.route("/find/:id").get(getHotelById);
router.route("/countByCity").get(countByCity);
router.route("/countByType").get(countByType);
router.route("/room/:id").get(getHotelRooms);

export default router;
