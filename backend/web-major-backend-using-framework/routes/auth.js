async function authRoutes (fastify, options) {
	// Register of user
	fastify.post('/register', async (request, reply) => {
		return reply.code(200).send('Registro do usuário feito');	
	});

	// Login
	fastify.post('/login', async (request, reply) => {
		return reply.code(200).send('Login efetuado com sucesso');
	});
	// Logout
	fastify.post('/logout', async (request, reply) => {
		return reply.code(200).send('Logout efetuado com sucesso');
	});

	// Refresh -> validate the access again
	fastify.post('/refresh', async (request, reply) => {
		return reply.code(200).send('Atualização da sessão');
	});

	// Logout -> invalid the refresh

	fastify.post('/forgot', async (request, reply) => {
		return reply.code(200).send('Recuperação da senha');
	});

	// Get information about the login
	fastify.get('/me', async (request, reply) => {
		return reply.code(200).send('Pedindo informações sobre o login atual');
	});
};

module.exports = authRoutes;
