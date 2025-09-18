import fp from 'fastify-plugin';
import DatabaseConnection from '../database/connection.js';
import DatabaseMigration from '../database/migrations.js';
import DatabaseQueries from '../database/queries/queries.js';
import DatabaseAuthQueries from '../database/queries/auth_queries.js';

async function databasePlugin(fastify, options) {
  const dbConnection = new DatabaseConnection();
  
  try {
    await dbConnection.connect();
    const db = dbConnection.getDatabase();
    const queries = new DatabaseQueries(db);
    const auth_queries = new DatabaseAuthQueries(db);
    
    fastify.decorate('db', db);
    fastify.decorate('dbQueries', queries);
    fastify.decorate('dbConnection', dbConnection);
    fastify.decorate('dbAuthQueries', auth_queries);
    
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
