const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");


exports.signup = (req, res) => {
  
  
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(409).json({ message: "User email already exists!" });
      
    } else {
      const user = registerUser(req);

      user.save((err, user) => {
        if (check500Error(err, res)) {
          return;
        } 
         {
          res.status(200).json({ message: "User registered" });
        }
      });
    }
  });
};

exports.follow = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.body.id);

    if (!userToFollow) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (userToFollow.followers.includes(req.body.myId)) {
      return res.status(400).json({ msg: "You already follow this user!" });
    }

    userToFollow.followers.push(req.body.myId);

    await userToFollow.save();

    const currentUser = await User.findById(req.body.myId);
    currentUser.following.push(userToFollow.id);
    await currentUser.save();

    return res.status(200).json({ message: "User followed " });
  } 
  
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.unfollow = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.body.id);

    if (!userToUnfollow) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!userToUnfollow.followers.includes(req.body.myId)) {
      return res.status(400).json({ msg: "You do not follow this user" });
    }

    const followerIndex = userToUnfollow.followers.indexOf(req.body.id);
    userToUnfollow.followers.splice(followerIndex, 1);
    await userToUnfollow.save();

    const currentUser = await User.findById(req.body.myId);
    const followingIndex = currentUser.following.indexOf(userToUnfollow.id);
    currentUser.following.splice(followingIndex, 1);
    await currentUser.save();

    return res.status(200).json({ message: "User Unfollowed " });
  } 
  
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getfollowers = async (req, res) => {
  try {
    const user = await User.findById(req.body.id).populate(
      "followers",
      "fullName"
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res
      .status(200)
      .json({ msg: "User found", userData: user.followers });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getfollowing = async (req, res) => {
  try {
    const user = await User.findById(req.body.id).populate(
      "following",
      "fullName"
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res
      .status(200)
      .json({ msg: "User found", userData: user.following });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.search = async (req, res) => {

  const q = req.body.value;

  

  try {
    const users = await User.find({
      
      $or: [
        { fullName: { $regex: new RegExp(q, "i") } },
        { email: { $regex: new RegExp(q, "i") } },
      ],
    });

    return res
      .status(200)
      .json({ msg: "Searched Successfully", userData: users });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (check500Error(err, res)) {
      return;
    }
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!isValidPassword(user, req.body.password)) {
      return res
        .status(401)
        .json({ accessToken: null, message: "Invalid password" });
    }


    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.API_SECRET,
      { expiresIn: 9999 }
    );

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
         fullName: user.fullName,
      },
      message: "Login successful",
      accessToken: token,
    });
  });
};

exports.getFriends = (req, res) => {
  res.json("Friends List");
};

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function check500Error(err, res) {
  if (err) {
    res.status(500).json({ message: err });
    return true;
  }
  return false;
}

function registerUser(req) {
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 12),
  });
  return user;
}
