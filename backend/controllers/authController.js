const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");



// Signup


exports.signup = async (req, res) => {

  const {
    name,
    email,
    password,
    role
  } = req.body;

  try {

    // Check if user exists

    const userExists =
      await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    // Hash password

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create user

    const user =
      await User.create({

        name,
        email,

        password: hashedPassword,

        role:
          role || "Member"

      });

    res.status(201).json({

      message: "User created",

      user: {

        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role

      }

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};




// Login


exports.login = async (req, res) => {

  const {
    email,
    password
  } = req.body;

  try {

    // Find user

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(404).json({

        message: "User not found"

      });

    }

    // Compare password

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({

        message: "Invalid password"

      });

    }

    // Create JWT

    const token = jwt.sign(

      {
        id: user._id,
        role: user.role
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d"
      }

    );

    res.json({

      token,

      user: {

        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role

      }

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};




// Get Users (For Assign Task)


exports.getUsers = async (req, res) => {

  try {

    const users =
      await User.find()

        .select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};