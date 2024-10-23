// controllers/admin/post.controller.js
import Post from '../../../../database/models/post.model.js';
import User from '../../../../database/models/user.model.js';

// Create Post (Admin)
export async function createPost(req, res) {
  try {
    const { title, content, authorId } = req.body; // Admin can specify authorId
    const post = await Post.create({ title, content, authorId });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update Post (Admin)
export async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.title = title !== undefined ? title : post.title;
    post.content = content !== undefined ? content : post.content;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete Post (Admin)
export async function deletePost(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    await post.destroy();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get All Posts
export async function getAllPosts(req, res) {
  try {
    const posts = await Post.findAll({ include: User }); // Include author info
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get Post by ID
export async function getPostById(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id, { include: User });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
