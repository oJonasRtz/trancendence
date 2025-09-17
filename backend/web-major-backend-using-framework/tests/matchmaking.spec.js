const supertest = require('supertest');
const fs = require('node:fs/promises');
const path = require('path');
const fastify = require(path.resolve(__dirname, '..', 'index.js'));

beforeAll(async () => {
	await fastify.ready();
});

afterAll(async () => {
	await fastify.close();
});

describe ('Começando os testes do montador de partidas', () => {
	// Teste de colocar na fila do montador de partidas
	test('Entrando na fila do matchmaking', async () => {
		const response = await supertest(fastify.server)
		.post('/api/matchmaking/enqueue')
		.send({})
		.expect(200);
	});

	// Saindo da fila do matchmaking
	test('Removendo da fila do matchmaking', async () => {
		const response = await supertest(fastify.server)
		.post('/api/matchmaking/dequeue')
		.send({})
		.expect(200);
	});

	// Status da fila
	test('Mostrando o status do matchmaking', async () => {
		const response = await supertest(fastify.server)
		.get('/api/matchmaking/status')
		.expect(200);
	});
});
