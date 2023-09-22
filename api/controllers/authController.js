import User from "../models/userModel.js";

export const register = async (req, res, next) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save();
    res.status(201).send("User has been created successfully");
  } catch (error) {
    next(error);
  }
};
