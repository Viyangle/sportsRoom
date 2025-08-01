const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');


// 评论路由配置
router.get('', commentController.getAllComments);
router.get('/:id', commentController.getAllCommentsById);
router.get('/:aid/:cid', commentController.getCommentById);
router.post('', commentController.createComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;