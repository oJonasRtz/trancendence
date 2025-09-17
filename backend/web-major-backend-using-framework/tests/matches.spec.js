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

describe ('Começando os testes dos matches de partidas', () => {
	// Obter todas as partidas acontecendo
	test('Obter todas as partidas ocorrendo', async () => {
		const response = await supertest(fastify.server)
		.get('/api/matches')
		.expect(200);
	});

	// Criar uma nova partida
	test('Criar uma nova partida', async () => {
		const response = await supertest(fastify.server)
		.post('/api/matches')
		.send({})
		.expect(200);
	});

	// Obter o estado e metadados de uma partida
	test('Obter o estado de uma partida', async () => {
		const response = await supertest(fastify.server)
		.get('/api/matches/1')
		.expect(200);
	});

	// Obter o histórico do jogador
	test('Obter o histórico do jogador', async () => {
		const response = await supertest(fastify.server)
		.get('/api/matches/users/1')
		.expect(200);
	});

	// encerrar a partida
	test('Encerrando a partida, não aceita mais jogadores', async () => {
		const response = await supertest(fastify.server)
		.patch('/api/matches/1')
		.send({})
		.expect(200);
	});
});
