const CommentRepository = require('../repositories/commentRepository');

class CommentService {

    // 创建评论
    async createComment(commentData) {
        return CommentRepository.create(commentData);
    }

    // 删除评论
    async deleteComment(id) {
        return CommentRepository.delete(id);
    }

    // 获取所有评论
    async getAllComments() {
        return CommentRepository.findAll();
    }

    // 获取评论
    async getCommentById(id) {
        return CommentRepository.findById(id);
    }

    // 获取所有评论
    async getAllCommentsById(activity_id) {
        return CommentRepository.findAllById(activity_id);
    }
}

module.exports = new CommentService();