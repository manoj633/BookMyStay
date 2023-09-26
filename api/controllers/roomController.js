import Room from "../models/roomModel.js";
import Hotel from "../models/hotelModel.js";

export const addRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

//@desc     Update Room Details by ID
//@route    PUT /api/rooms/:id
//@access   Private
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

//@desc     Update Room Availability by ID
//@route    PUT /api/rooms/availability/:id
//@access   Private
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      {
        "roomNumbers._id": req.params.id,
      },
      {
        $push: {
          "roomNumbers.$.unavilableDates": req.body.dates,
        },
      }
    );

    res.status(200).json("Room status has been updated");
  } catch (error) {
    next(error);
  }
};

//@desc     Delete a Room by ID
//@route    DELETE /api/rooms/:id
//@access   Private
export const deleteRoomById = async (req, res, next) => {
  const hotelId = req.params.hotelid;

  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndDelete(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).send("Room deleted");
  } catch (error) {
    next(error);
  }
};

//@desc     Get Room Details by ID
//@route    GET /api/rooms/:id
//@access   Private
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

//@desc     Get All Room Details
//@route    GET /api/Rooms/
//@access   Public
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
