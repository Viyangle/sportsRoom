// repositories/userRepository.js
const db = require('../database/db');

class UserRepository {
    async findAll() {
        return db.query('SELECT * FROM users ORDER BY created_at DESC');
    }

    async findById(id) {
        return db.get('SELECT * FROM users WHERE id = ?', [id]);
    }

    async findByEmail(email) {
        return db.get('SELECT * FROM users WHERE email = ?', [email]);
    }
    async create(userData) {
        const { name, email } = userData;
        const result = db.run(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, email]
        );

        return this.findById(result.lastInsertRowid);
    }

    async delete(id) {
        const result = db.run('DELETE FROM users WHERE id = ?', [id]);
        return result.changes > 0;
    }
}

module.exports = new UserRepository();