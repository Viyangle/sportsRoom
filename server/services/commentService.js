const CommentRepository = require('../repositories/commentRepository');

class CommentService {
    async createComment(commentData) {
        return CommentRepository.create(commentData);
    }

    async deleteComment(id) {
        return CommentRepository.delete(id);
    }

    async getCommentById(id) {
        return CommentRepository.findById(id);
    }

    async getAllComments(activity_id) {
        return CommentRepository.findAll(activity_id);
    }
}

module.exports = new CommentService();