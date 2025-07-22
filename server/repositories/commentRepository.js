const db = require('../database/db');

class CommentRepository{

    async findAll(activity_id) {
        const sql = 'SELECT * FROM comments WHERE activity_id = ? ORDER BY joined_at DESC';
        return db.query(sql, [activity_id]);
    }

    async findById(id) {
        const sql = 'SELECT * FROM comments WHERE id = ?';
        return db.get(sql, [id]);
    }
    async create(commentData) {
        const { userId, activityId, content } = commentData;
        const sql = 'INSERT INTO comments (user_id, activity_id, content) VALUES (?, ?, ?)';
        const params = [userId, activityId, content];
        const result = db.run(sql, params);
        return result.lastInsertRowid;
    }
    async delete(id) {
        const sql = 'DELETE FROM comments WHERE id = ?';
        const params = [id];
        const result = db.run(sql, params);
        return result.changes > 0;
    }
}

module.exports = new CommentRepository();