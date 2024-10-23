// controllers/admin/user.controller.js
import User from '../../../../database/models/user.model.js';

// Create User
export async function createUser(req, res) {
  try {
    const { name, email, password, isAdmin } = req.body; // Assuming we allow setting isAdmin at creation
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, isAdmin });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update User
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email, isAdmin } = req.body; // Admins can change user roles
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.name = name !== undefined ? name : user.name; // Only update if provided
    user.email = email !== undefined ? email : user.email; // Only update if provided
    user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin; // Update role if provided

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete User
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.destroy(); // Soft delete or hard delete based on your implementation
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get All Users
export async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
