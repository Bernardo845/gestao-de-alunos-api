const request = require('supertest');
const { expect } = require('chai');
const { loginAdmin, loginUsuario } = require('./helpers/authHelper');
const dados = require('./data/alunoData.json');
require('dotenv').config();

const baseUrl = process.env.URL_BASE || 'http://localhost:3000';

describe('Fluxo do Aluno e Entrega de Trabalho', () => {
  let tokenAdmin;
  let tokenAluno;

  before(async () => {
    tokenAdmin = await loginAdmin();
  });

  it('1. Deve cadastrar um aluno como Administrador', async () => {
    const res = await request(baseUrl)
      .post('/usuarios')
      .set('Authorization', Bearer ${tokenAdmin})
      .send({
        nome: dados.nome,
        email: dados.email,
        senha: dados.senha,
        perfil: dados.perfil
      });

    expect(res.status).to.equal(201);
  });

  it('2. Deve logar como o aluno recém-cadastrado', async () => {
    tokenAluno = await loginUsuario(dados.email, dados.senha);
    expect(tokenAluno).to.be.a('string');
  });

  it('3. Deve registrar a entrega de um trabalho como aluno', async () => {
    const res = await request(baseUrl)
      .post('/trabalhos')
      .set('Authorization', Bearer ${tokenAluno})
      .send(dados.trabalho);

    expect(res.status).to.equal(201);
  });
});