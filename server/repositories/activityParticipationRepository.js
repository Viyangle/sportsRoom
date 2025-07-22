const db = require('../database/db');

class ActivityParticipationRepository {
    async findAll(user_id) {
        return db.query('SELECT * FROM activity_participation WHERE user_id = ? ORDER BY joined_at DESC', [user_id] );
    }
    async create(activityParticipationData) {
        const { activityId, userId } = activityParticipationData;
        const sql = 'INSERT INTO activity_participation (activity_id, user_id) VALUES (?, ?)';
        const params = [activityId, userId];
        const result = await db.run(sql, params);
        return result.lastInsertRowid > 0;
    }

    async delete(activityId, userId) {
        const sql = 'DELETE FROM activity_participation WHERE activity_id = ? AND user_id = ?';
        const params = [activityId, userId];
        const result = await db.run(sql, params);
        return result.changes > 0;
    }
}