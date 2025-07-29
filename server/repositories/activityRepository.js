const db = require('../database/db');

class ActivityRepository {
    async findAll() {
        return db.query('SELECT * FROM activities ORDER BY created_at DESC');
    }
    async findById(id) {
        return db.get('SELECT * FROM activities WHERE id = ?', [id]);
    }
    async create(activityData) {
        const { name, detail } = activityData;
        const sql = `INSERT INTO activities (name, detail) VALUES (?, ?)`;
        const params = [name, detail];
        const result = db.run(sql, params);
        return this.findById(result.lastInsertRowid);
    }

    async delete(id) {
        const result = db.run('DELETE FROM activities WHERE id = ?', [id]);
        return result.changes > 0;
    }

}

module.exports = new ActivityRepository();