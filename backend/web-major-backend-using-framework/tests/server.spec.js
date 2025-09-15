const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
const fastify = require(path.resolve(__dirname, '..', 'index.js'));

beforeAll(async () => {
	await fastify.ready();
});

afterAll(async () => {
	await fastify.close();
});

describe ('Testando as rotas GET', () => {
	test('Esse teste deve retornar todos os usuários', async () => {
		const response = await supertest(fastify.server)
		.get('/api/users/')
		.expect(200);
	});

	test('Esse teste deve retornar o primeiro usuário', async () => {
		const response = await supertest(fastify.server)
		.get('/api/users/1')
		.expect(200);
	});

	test('Esse teste deve retornar usuários por meio de query', async () => {
		const response = await supertest(fastify.server)
		.get('/api/users/search?filterByNickInitial=FER')
		.expect(200);
	});

	test('Testando usuário que não existe por id', async () => {
		const response = await supertest(fastify.server)
		.get('/api/users/14829348293')
		.expect(200); // Vai mudar para 404
	});

	test('Testando query inexistente', async () => {
		const response = await supertest(fastify.server)
		.get('/api/users/search?nickStartWith=asakldfjkasldjfsçk')
		.expect(200); // Vai mudar para 404
	});
});

describe ('Testando a rota POST', () => {
	test.skip('Testando caso válido', async () => {
		const response = await supertest(fastify.server)
		.post('/api/users/register')
		.send({'username': 'Fernando', 'email': 'ab@gmail.com', 'password': 'abcdefghijklm'})
		.expect(201);
	});

	test.skip('Testando caso inválido', async () => {
		const response = await supertest(fastify.server)
		.post('/api/users/register')
		.send({'user': 'Felipe', 'email': 'abc@gmail.com', 'password': 'abcdefghijkl'})
		.expect(400);
	});
});

describe ('Testando as rotas PUT e PATCH', () => {
	test('Testando o PUT caso válido', async () => {
		const response = await supertest(fastify.server)
		.put('/api/users/update/1')
		.send({'username': 'Fernando', 'email': 'fernandoocara@gmail.com', 'password': 'fernandoocaralegal'})
		.expect(200);
	});

	test('Testando o PUT caso inválido', async () => {
		const response = await supertest(fastify.server)
		.put('/api/users/update/1')
		.send({'email': 'josefelipeocara@gmail.com', 'password': 'joseocarachato'})
		.expect(200) // Vai mudar para 400
	});

	test('Testando o PATCH caso válido', async () => {
		const response = await supertest(fastify.server)
		.patch('/api/users/update/1')
		.send({'email': 'fernandoocaralegal@gmail.com'})
		.expect(200);
	});

	test('Testando o PATCH caso inválido', async () => {
		const response = await supertest(fastify.server)
		.patch('/api/users/update/1')
		.send({'email': 'joseocarachato@gmail.com'})
		.expect(200); // depois vai ser 404
	});
});

describe ('Testando a rota DELETE', () => {
	test('Testando o DELETE caso válido', async () => {
		const response = await supertest(fastify.server)
		.delete('/api/users/remove/1')
		.expect(204);
	});

	test('Testando o DELETE caso inválido', async () => {
		const response = await supertest(fastify.server)
		.delete('/api/users/remove/214322342424')
		.expect(204);
	});
});
