import bcrypt from "bcrypt";
import User from "../../../database/models/user.model.js";

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with isAdmin flag and status 'logged_out'
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
      status: "logged_out",
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    // Validate the user and password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    //update the user's status to logged_in
    req.userId = user.id;
    user.status = "logged_in";
    await user.save();

    // Respond with success message and role
    res.json({
      message: "Login successful",
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // If authenticated, update the user's status 
    user.status = "logged_out";
    await user.save();
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
