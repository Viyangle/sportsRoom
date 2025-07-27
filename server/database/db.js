// database/db.js
const Database = require('better-sqlite3');

class DB {
    constructor(filePath = './database.sqlite') {
        this.db = new Database(filePath);
        this.db.pragma('journal_mode = WAL');
        this.initializeDatabase();
    }

    initializeDatabase() {
        // 创建用户表
        this.db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
        // 创建活动表
        this.db.exec(`
        CREATE TABLE IF NOT EXISTS activities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            detail TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `)
        // 创建活动参与表
        this.db.exec(`
        CREATE TABLE IF NOT EXISTS activity_participation (
            activity_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (activity_id, user_id),
            FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `)

        // 创建评论表
        this.db.exec(`
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            activity_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            text TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `)
    }

    query(sql, params = []) {
        return this.db.prepare(sql).all(...params);
    }

    get(sql, params = []) {
        return this.db.prepare(sql).get(...params);
    }

    run(sql, params = []) {
        return this.db.prepare(sql).run(...params);
    }
}

module.exports = new DB();