import express from "express";
import Hotel from "../models/hotelModel.js";
import {
  addHotel,
  countByCity,
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
  .delete(verifyAdmin, deleteHotelById);

router.route("/find/:id").get(getHotelById);
router.route("/countByCity").get(countByCity);

export default router;
