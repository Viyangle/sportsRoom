// controllers/userController.js
const userService = require('../services/userService');

const userController = {
    // 获取所有用户
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error('获取用户失败:', error);
            res.status(500).json({ error: error.message || '服务器错误' });
        }
    },

    // 获取单个用户
    async getUserById(req, res) {
        try {
            const userId = parseInt(req.params.id);
            if (isNaN(userId)) {
                return res.status(400).json({ error: '无效的用户ID' });
            }

            const user = await userService.getUserById(userId);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: '用户不存在' });
            }
        } catch (error) {
            console.error('获取用户失败:', error);
            res.status(500).json({ error: error.message || '服务器错误' });
        }
    },

    async getUserByEmail(req, res) {
        try {
            const newUser = await userService.getUserByEmail(req.body);
            if (newUser) {
                res.json(newUser);
            } else {
                res.status(404).json({ error: '用户不存在' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message || '服务器错误' });
        }
    },

    // 创建用户
    async createUser(req, res) {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('创建用户失败:', error);
            res.status(400).json({ error: error.message || '请求错误' });
        }
    },

    // 删除用户
    async deleteUser(req, res) {
        try {
            const userId = parseInt(req.params.id);
            if (isNaN(userId)) {
                return res.status(400).json({ error: '无效的用户ID' });
            }

            const success = await userService.deleteUser(userId);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: '用户不存在' });
            }
        } catch (error) {
            console.error('删除用户失败:', error);
            res.status(500).json({ error: error.message || '服务器错误' });
        }
    }
};

module.exports = userController;