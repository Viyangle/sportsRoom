const db = require('../database/db');

class CommentRepository{
    async findAll() {
        return db.query('SELECT * FROM comments ORDER BY created_at DESC');
    }

    async findAllById(activity_id) {
        const sql = 'SELECT * FROM comments WHERE activity_id = ? ORDER BY created_at DESC';
        return db.query(sql, [activity_id]);
    }

    async findById(id) {
        const sql = 'SELECT * FROM comments WHERE id = ?';
        return db.get(sql, [id]);
    }
    async create(commentData) {
        const { uid, aid, c } = commentData;
        const sql = 'INSERT INTO comments (user_id, activity_id, text) VALUES (?, ?, ?)';
        const params = [uid, aid, c];
        const result = db.run(sql, params);
        return this.findById(result.lastInsertRowid);
    }
    async delete(id) {
        const sql = 'DELETE FROM comments WHERE id = ?';
        const params = [id];
        const result = db.run(sql, params);
        return result.changes > 0;
    }
}

module.exports = new CommentRepository();