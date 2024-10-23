// middleware/auth.js
import User from '../../database/models/user.model.js'; // Adjust the import path as needed

// Middleware to check if the user is authenticated
export function isAuthenticated(req, res, next) {
  // Check if user is logged in by verifying the session
  if (req.session && req.session.userId) {
    return next(); // User is authenticated, proceed to next middleware/route
  }
  return res.status(401).json({ error: 'Unauthorized: Please log in' });
}

// Middleware to check if the user is an admin
export async function isAdmin(req, res, next) {
  // Check if the user is authenticated first
  if (req.session && req.session.userId) {
    try {
      // Fetch the user from the database
      const user = await User.findByPk(req.session.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Check if the user has admin privileges
      if (user.isAdmin) {
        return next(); // User is an admin, proceed to the next middleware or route handler
      } else {
        return res.status(403).json({ error: 'Forbidden: Admins only' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  return res.status(401).json({ error: 'Unauthorized: Please log in' });
}
