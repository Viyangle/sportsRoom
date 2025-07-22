// services/userService.js
const userRepository = require('../repositories/userRepository');

class UserService {
    async getAllUsers() {
        return userRepository.findAll();
    }

    async getUserById(id) {
        return userRepository.findById(id);
    }

    async createUser(userData) {
        // 验证逻辑
        if (!userData.name || !userData.email) {
            throw new Error('姓名和邮箱不能为空');
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            throw new Error('邮箱格式不正确');
        }

        // 检查邮箱是否已存在
        const existingUser = await userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('邮箱已被注册');
        }

        return userRepository.create(userData);
    }

    async deleteUser(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('用户不存在');
        }

        return userRepository.delete(id);
    }
}

module.exports = new UserService();