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

describe ('Começando os testes focando no usuário', () => {
	// Atualizar os dados cadastrados de um usuário (avatar, nickname, email, senha...)
	test('atualizar dados do usuário', async () => {
		const response = await supertest(fastify.server)
		.patch('/api/users/update/1')
		.send({})
		.expect(200);
	});

	// Rota para remover um usuário do banco de dados
	test('remover um usuário', async () => {
		const response = await supertest(fastify.server)
		.delete('/api/users/remove/1')
		.expect(200);
	});

	// Consultar a lista de usuários completa
	
	test('receber a lista completa de usuários', async () => {
		const response = await supertest(fastify.server)
		.get('/api/users')
		.expect(200);
	});

	// consultar um usuário por ID
	
	test('receber um usuário pelo ID especificado', async () => {
		const response = await supertest(fastify.server)
		.get('/api/users/:id')
		.expect(200);
	});

	// consultar usuários por query 
	
	test('receber usuários por consulta query nickStartWith', async () => {
		const response = await supertest(fastify.server)
		.get('/api/users/search')
		.expect(200);
	});

	// registrar novo usuário
	test.skip('registrar um novo usuário', async () => {
		const response = await supertest(fastify.server)
		.post('/api/users/register')
		.expect(200);
	});

	// Atualização completa de um usuário
	test('Atualização completa de um usuário', async () => {
		const response = await supertest(fastify.server)
		.post('/api/users/update/1')
		.expect(200);
	});

	// Obter status de um usuário especificado por ID
	test('Obter status de um usuário', async () => {
		const response = await supertest(fastify.server)
		.get('/api/users/1/stats')
		.expect(200);
	});

	// Upload an avatar
	test('Enviando o avatar do usuário para o servidor', async () => {
		const response = await supertest(fastify.server)
		.get('/api/users/1/avatar')
		.expect(200);
	});
});
