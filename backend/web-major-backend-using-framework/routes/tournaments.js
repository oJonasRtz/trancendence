async function tournamentRoutes(fastify, options) {
	fastify.post('/', async (request, reply) => {
	try {
		const { name, maxParticipants } = request.body;
    		if (!name || name.trim().length === 0) {
			return reply.code(400).send({ error: 'Tournament name is required' });
		}
    		const tournament = await fastify.dbQueries.createTournament(name.trim(), maxParticipants);
		return reply.code(201).send({ tournament });
    } catch (error) {
    	fastify.log.error(error);
    	return reply.code(500).send({ error: 'Internal server error' });
  }
});

fastify.get('/', async (request, reply) => {
	try {
		const tournaments = await fastify.dbQueries.getAllTournaments();
		return reply.send({ tournaments });
	} catch (error) {
		fastify.log.error(error);
		return reply.code(500).send({ error: 'Internal server error' });
	}
});
}

module.exports = tournamentRoutes;
