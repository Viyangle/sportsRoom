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
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
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