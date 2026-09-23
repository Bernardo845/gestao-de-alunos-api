const request = require('supertest');
require('dotenv').config();

const baseUrl = process.env.URL_BASE || 'http://localhost:3000';

async function loginAdmin() {
  const res = await request(baseUrl)
    .post('/login')
    .send({
      email: process.env.ADMIN_EMAIL,
      senha: process.env.ADMIN_PASSWORD
    });

  return res.body.token;
}

async function loginUsuario(email, senha) {
  const res = await request(baseUrl)
    .post('/login')
    .send({ email, senha });

  return res.body.token;
}

module.exports = { loginAdmin, loginUsuario };