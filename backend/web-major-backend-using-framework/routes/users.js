const path = require('path');
const AuthUtils = require(path.resolve(__dirname, '..', 'src', 'utils', 'auth'));

async function usersRoutes(fastify, options) {
	fastify.post('/register', async (request, reply) => {
	try {
	const { username, email, password } = request.body;
	if (!AuthUtils.validateUsername(username)) {
		return reply.code(400).send({ error: 'Invalid username' });
	}
	if (!AuthUtils.validateEmail(email)) {
		return reply.code(400).send({ error: 'Invalid email' });
	}
	if (!AuthUtils.validatePassword(password)) {
		return reply.code(400).send({ error: 'Password must be at least 8 characters' });
	}
    	const existingUser = await fastify.dbQueries.getUserByUsername(username);
	if (existingUser) {
 		return reply.code(409).send({ error: 'Username already exists' });
 	}
    	const existingEmail = await fastify.dbQueries.getUserByEmail(email);
	if (existingEmail) {
		return reply.code(409).send({ error: 'Email already exists' });
	}
    	const user = await fastify.dbQueries.createUser(username, email, password);
	return reply.code(201).send({ user: { id: user.id, username: user.username, email: user.email } });
    
	} catch (error) {
		fastify.log.error(error);
		return reply.code(500).send({ error: 'Internal server error' });
	}
});
}
module.exports = usersRoutes; 
