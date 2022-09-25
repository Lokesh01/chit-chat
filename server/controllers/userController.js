const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateWebTokens");

const registerUser = async (req, res, next) => {
  // console.log(req.body);
  const { username, email, password } = req.body;
  //to check for unique username and email
  const userCheck = await Users.findOne({ username });
  const emailCheck = await Users.findOne({ email });

  try {
    if (userCheck) {
      return res.json({ msg: "Username already taken", status: false });
    }

    if (emailCheck) {
      return res.json({ msg: "Email already taken", status: false });
    }

    //if everything is fine we will hash our password
    // the 2 arg of the .hash() is the salt which is a unique string of chars added to our pass before it is hashed
    const hashedPass = await bcrypt.hash(password, 10);

    //creating docs inside db
    const User = await Users.create({
      username,
      email,
      password: hashedPass,
    });

    //to avoid password in res
    // delete User.password;

    if (User) {
      return res.status(201).json({
        status: true,
        user: {
          _id: User._id,
          username: User.username,
          email: User.email,
          token: generateToken(User._id),
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  //to check for unique username and email
  const User = await Users.findOne({ username });

  try {
    if (!User) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }

    const checkPass = await bcrypt.compare(password, User.password);
    if (!checkPass) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    delete User.password;

    return res.status(200).json({
      status: true,
      user: {
        _id: User._id,
        username: User.username,
        email: User.email,
        isAvatarImageSet:User.isAvatarImageSet,
        avatarImage: User.avatarImage,
        token: generateToken(User._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    const userData = await Users.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage:avatarImage,
    });

    return res.status(201).json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    //getting all users except current user
    const users = await Users.find({ _id: { $ne: userId } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);

    return res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, setAvatar, getAllUsers };
