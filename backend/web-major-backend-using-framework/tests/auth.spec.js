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

describe('Testando autenticação do usuário', () => {
	test('criação de usuário', async () => {
		const response = await supertest(fastify.server)
		.post('/api/test/users/register')
		.send({})
		.expect(200);
	});
	test('login do usuário', async () => {
		const response = await supertest(fastify.server)
		.post('/api/test/users/login')
		.send({})
		.expect(200);
	});
	test('refresh do usuário', async () => {
		const response = await supertest(fastify.server)
		.post('/api/test/users/refresh')
		.send({})
		.expect(200);
	});
	test('logout do usuário', async () => {
		const response = await supertest(fastify.server)
		.post('/api/test/users/logout')
		.send({})
		.expect(200);
	});
	test('esqueceu a senha', async () => {
		const response = await supertest(fastify.server)
		.post('/api/test/users/forgot')
		.send({})
		.expect(200);
	});
	test('obter os dados do usuário logado', async () => {
		const response = await supertest(fastify.server)
		.get('/api/test/users/me')
		.expect(200);
	});
});
