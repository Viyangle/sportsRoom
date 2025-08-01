const userRepository = require('../repositories/userRepository');

class UserService {
    // 获取所有用户
    async getAllUsers() {
        return userRepository.findAll();
    }

    // 获取单个用户
    async getUserById(id) {
        return userRepository.findById(id);
    }

    // 获取用户通过邮箱
    async getUserByEmail(email) {
        return userRepository.findByEmail(email);
    }

    // 创建用户
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

    // 删除用户
    async deleteUser(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('用户不存在');
        }

        return userRepository.delete(id);
    }
}

module.exports = new UserService();