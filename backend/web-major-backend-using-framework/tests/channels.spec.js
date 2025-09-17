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

describe ('Começando os testes dos canais dos usuários', () => {
	// obter todos os canais
	test('obtendo todos os canais de usuários disponíveis', async () => {
		const response = await supertest(fastify.server)
		.get('/api/channels/')
		.expect(200);
	});

	// 
});
