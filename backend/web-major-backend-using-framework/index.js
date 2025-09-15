// Set framework

const fastify = require('fastify')({ logger: true });

const path = require('path');

// Set routes path

const userRoutes = require(path.resolve(__dirname, 'routes', 'users.js'));
const authRoutes = require(path.resolve(__dirname, 'routes', 'auth.js'));
const relationsRoutes = require(path.resolve(__dirname, 'routes', 'relations.js'));
const lobbiesRoutes = require(path.resolve(__dirname, 'routes', 'lobbies.js'));
const matchmakingRoutes = require(path.resolve(__dirname, 'routes', 'matchmaking.js'));
const matchesRoutes = require(path.resolve(__dirname, 'routes', 'matches.js'));
const tournamentRoutes = require(path.resolve(__dirname, 'routes', 'tournaments.js'));
const healthRoutes = require(path.resolve(__dirname, 'routes', 'health.js'));

// Set handlers

require(path.resolve(__dirname, 'handlers', 'notFoundHandler.js'))(fastify);
require(path.resolve(__dirname, 'handlers', 'errorHandler.js'))(fastify);

// Set Database

fastify.register(require(path.resolve(__dirname, 'src', 'plugins', 'database')));

fastify.get('/', async (request, reply) => {
  return { hello: 'world', database: 'connected' };
});

// Register routes

fastify.register(userRoutes, { prefix:'/api/users' });
fastify.register(authRoutes, { prefix: '/api/test/users' });
fastify.register(relationsRoutes, { prefix: '/api/friends' });
fastify.register(lobbiesRoutes, { prefix: '/api/lobbies' });
fastify.register(matchmakingRoutes, { prefix: '/api/matchmaking' });
fastify.register(matchesRoutes, { prefix: '/api/matches' });
fastify.register(tournamentRoutes, { prefix: '/api/tournaments' });
fastify.register(healthRoutes);

module.exports = fastify;
