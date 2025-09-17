import fs from 'fs';
import path from 'path';
import DatabaseConnection from './connection.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function inputInDataBase(db, sql) {
	return new Promise((resolve, reject) => {
		db.exec(sql, (err) => {
			if (err) return reject(err);
			resolve();
		});
	});
}

class DatabaseMigrations {
  constructor() {
    this.dbConnection = new DatabaseConnection();
  }

  async runMigrations() {
	console.log('Tô aqui, meu amigo');
    try {
      await this.dbConnection.connect();
      const db = this.dbConnection.getDatabase();
      
      const migrations = ['authSchema.sql', 'schema.sql'];

      for (const schemaSQL of migrations) {

	console.log(`Estou lendo ${schemaSQL}`);
	let schemaPath = path.join(__dirname, 'schemas', schemaSQL);
	let schema = fs.readFileSync(schemaPath, 'utf8');
      
	console.log('oi');
	await inputInDataBase(db, schema);
	console.log(`Schema ${schemaSQL} created successfully\n`);
}
      
      console.log('Database migrations completed successfully');
      await this.dbConnection.close();
      
    } catch (error) {
      console.error('Migration failed:', error);
      await this.dbConnection.close();
      throw error;
    }
  }

  executeStatement(db, statement) {
    return new Promise((resolve, reject) => {
      db.run(statement, (err) => {
        if (err) {
          console.error('Error executing statement:', statement);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

export default DatabaseMigrations;
