// controllers/admin/comment.controller.js
import Comment from '../../../../database/models/comment.model.js';
import User from '../../../../database/models/user.model.js'; // Assuming you have a Comment model set up

// Create Comment (Admin)
export async function createComment(req, res) {
  try {
    const { content, postId, authorId } = req.body; // Admin can specify authorId
    const comment = await Comment.create({ content, postId, authorId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update Comment (Admin)
export async function updateComment(req, res) {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    comment.content = content !== undefined ? content : comment.content;
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete Comment (Admin)
export async function deleteComment(req, res) {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    await comment.destroy();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get All Comments
export async function getAllComments(req, res) {
  try {
    const comments = await Comment.findAll({ include: User }); // Include author info
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
