import supertest from 'supertest';
import fs from 'node:fs/promises';
import path from 'path';
import { runMigrations } from '../src/database/migration.js';
import fastify from '../index.js';
import os from 'os';

beforeEach(async () => {
	DB_PATH = path.join(os.tmpdir(), `test-${Date.now()}.sqlite`);
	process.env.DB_PATH = DB_PATH;

	await ();
});

beforeAll(async () => {
	await fastify.ready();
});

afterAll(async () => {
	await fastify.close();
});

describe('Testando autenticação do usuário', () => {
	test('criação de usuário', async () => {
		const user = {
			username: 'Indiana Jones',
			email: 'indianaJones@gmail.com',
			password: 'IssoÉUmaSenhaForte'
		};
		const response = await supertest(fastify.server)
		.post('/api/test/users/register')
		.send(user)
		.expect(201);
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
