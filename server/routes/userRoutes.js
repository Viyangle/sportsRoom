// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 用户路由配置
router.get('', userController.getAllUsers);
router.get('/email/:email', userController.getUserByEmail);
router.get('/:id', userController.getUserById);
router.post('', userController.createUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;