import Hotel from "../models/hotelModel.js";

//@desc     Create new hotel
//@route    POST /api/hotels/
//@access   Private
export const addHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

//@desc     Update Hotel Details by ID
//@route    PUT /api/hotels/:id
//@access   Private
export const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

//@desc     Delete a Hotel by ID
//@route    DELETE /api/hotels/:id
//@access   Private
export const deleteHotelById = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).send("Hotel deleted");
    console.log("Hotel deleted");
  } catch (error) {
    next(error);
  }
};

//@desc     Get Hotel Details by ID
//@route    GET /api/hotels/:id
//@access   Private
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

//@desc     Get All Hotel Details
//@route    GET /api/hotels/
//@access   Public
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
