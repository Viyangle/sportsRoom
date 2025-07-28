const commentService = require('../services/commentService');

const commentController = {
  async createComment(req, res) {
    try {
        const commentData = req.body;
        const comment = await commentService.createComment(commentData);
        res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

  },

  async deleteComment(req, res) {
      try {
        const id = parseInt(req.params.id);
        await commentService.deleteComment(id);
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  },

    async getAllComments(req, res) {
      try {
        const comments = await commentService.getAllComments();
        res.json(comments);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  },

  async getAllCommentsById(req, res) {
      try {
          const id = parseInt(req.params.id);
        const comments = await commentService.getAllCommentsById(id);
        res.json(comments);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  },

  async getCommentById(req, res) {
      try {
        const cid  = parseInt(req.params.cid);
        const comment = await commentService.getCommentById(cid);
        res.json(comment);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  },
}

module.exports = commentController;