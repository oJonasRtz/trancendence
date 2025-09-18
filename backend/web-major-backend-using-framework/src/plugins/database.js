import fp from 'fastify-plugin';
import path from 'path';
import DatabaseConnection from '../database/connection.js';
import DatabaseMigration from '../database/migrations.js';

async function importAllQueries(fastify, db) {
	const queries = ['queries.js', 'auth.js'];
	const dbQueries = {};

	for ( const queryName of queries ) {
		let queryObject = await import(`../database/queries/${queryName}`);
		let extractQueryName = path.parse(queryName).name;
		let instance = new queryObject.default(db);
		dbQueries[extractQueryName] = instance;
	};
	fastify.decorate('dbQueries', dbQueries);
};

async function databasePlugin(fastify, options) {
  const dbConnection = new DatabaseConnection();
  
  try {
    await dbConnection.connect();
    const db = await dbConnection.getDatabase();
    
    await importAllQueries(fastify, db);
	  
    fastify.decorate('db', db);
    fastify.decorate('dbConnection', dbConnection);
    
    fastify.addHook('onClose', async (instance) => {
      await dbConnection.close();
    });
    
    console.log('Database plugin registered successfully');
    const migrations = new DatabaseMigration();
    migrations.runMigrations()
	.then(() => console.log('All migrations already done'))
	.catch((err) => console.err('Something wrong happened in migrations: ', err));
    console.log('Migrations did with success');
    
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
}

export default fp(databasePlugin, {
  name: 'database',
  dependencies: []
});
