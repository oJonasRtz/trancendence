import AuthUtils from '../../utils/auth.js';

class DatabaseQueries {
  constructor(db) {
    this.db = db;
  }
	async registerUser (username, email, password) {
		const passwordHash = await AuthUtils.hashPassword(password);
		return new Promise((resolve, reject) => {
			const stmt = this.db.prepare(`
			INSERT INTO auth (username, email, password_hash)
			VALUES (?, ?, ?)
			`);
		
		stmt.run([username, email, passwordHash], function (err) {
			stmt.finalize();
			if (err) {
				reject(err);
			} else {
				resolve(true);
			}
		});
	}); 
	};
};
export default DatabaseQueries;
