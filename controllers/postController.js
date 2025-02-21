// controllers/postController.js
const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post
const createPost = async (req, res) => {
  const { content } = req.body;
  const author = req.user.id; // From auth middleware

  try {
    const post = new Post({
      content,
      author,
    });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all posts with usernames
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single post with replies and usernames
const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate('author', 'username').populate('replies.author', 'username');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reply to a post
const replyToPost = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const author = req.user.id; // From auth middleware

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.replies.push({ content, author });
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createPost, getAllPosts, getPostById, replyToPost };