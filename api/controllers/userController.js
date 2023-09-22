import User from "../models/userModel.js";

//@desc     Update user Details by ID
//@route    PUT /api/users/:id
//@access   Private
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

//@desc     Delete a user by ID
//@route    DELETE /api/users/:id
//@access   Private
export const deleteUserById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User deleted");
  } catch (error) {
    next(error);
  }
};

//@desc     Get user Details by ID
//@route    GET /api/users/:id
//@access   Private
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//@desc     Get All user Details
//@route    GET /api/users/
//@access   Public
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
