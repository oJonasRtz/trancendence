const path = require('path');
const AuthUtils = require(path.resolve(__dirname, '..', 'src', 'utils', 'auth'));

async function usersRoutes(fastify, options) {
	fastify.patch('/update/:id', async (request, reply) => {
		const { id } = request.params;
		const { username, email, password } = request.body;
		return reply.code(200).send('Success update user');
	});
	fastify.delete('/remove/:id', async (request, reply) => {
		const { id } = request.params;
		return reply.code(204).send();
	});
	fastify.get('/', async (request, reply) => {
		return reply.code(200).send('Toma todo os usuários');
	});
	fastify.get('/:id', async (request, reply) => {
		const { id } = request.params;
		return reply.code(200).send('Toma o usuário de id especificado');
	});
	fastify.get('/search', async (request, reply) => {
		const { filterByNickInitial } = request.query;
		return reply.code(200).send('Toma a pesquisa aproximada pelo nick do usuário');
	});
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
	fastify.put('/update/:id', async (request, reply) => {
		const { id } = request.params;
		const { username, email, password } = request.body;

		return reply.code(200).send('Success update user');
	});
}
module.exports = usersRoutes; 
