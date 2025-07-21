// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 用户路由配置
router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;