import Comment from '../../../database/models/comment.model.js';
import Post from '../../../database/models/post.model.js';
import User from '../../../database/models/user.model.js';

// Create Comment
export async function createComment(req, res) {
  try {
    const { content, postId } = req.body;
    const userId = req.userId;
    const comment = await Comment.create({ content, postId, userId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get All Comments for a Post
export async function getCommentsByPostId(req, res) {
  try {
    const { postId } = req.params;
    const comments = await Comment.findAll({ where: { postId }, include: [User, Post] });
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update Comment
export async function updateComment(req, res) {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    if (comment.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    comment.content = content;
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete Comment (Soft Delete)
export async function deleteComment(req, res) {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    if (comment.userId !== req..userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await comment.destroy();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
