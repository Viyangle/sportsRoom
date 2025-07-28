const CommentRepository = require('../repositories/commentRepository');

class CommentService {
    async createComment(commentData) {
        return CommentRepository.create(commentData);
    }

    async deleteComment(id) {
        return CommentRepository.delete(id);
    }

    async getAllComments() {
        return CommentRepository.findAll();
    }

    async getCommentById(id) {
        return CommentRepository.findById(id);
    }

    async getAllCommentsById(activity_id) {
        return CommentRepository.findAllById(activity_id);
    }
}

module.exports = new CommentService();