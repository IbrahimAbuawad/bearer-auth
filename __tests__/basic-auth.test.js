'use strict';
require('@code-fellows/supergoose');
const server = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(server.app);
const base64 = require('base-64');


describe('testing server for signup', () =>{
  it ('should create a user account', async () => {
    const response = await request.post('/signup').send({
      username: 'ibrahim',
      password: '1234'
    });
    expect(response.status).toEqual(200);
    expect(response.body.password).toBeDefined();
    expect(response.body.username).toEqual('ibrahim')
  });
});

describe('testing server for signup assertion requirement', () =>{
  it ('should throw error for missing username', async () => {
    const response = await request.post('/signup').send({
      username: '',
      password: '1234'
    });
    expect(response.status).toEqual(403);
    expect(response.text).toEqual('Error Creating User');
  });
});

describe('testing server for signup assertion requirement', () =>{
  it ('should throw error for missing password', async () => {
    const response = await request.post('/signup').send({
      username: 'ibrahim',
      password: null,
    });
    expect(response.status).toEqual(403);
    expect(response.text).toEqual('Error Creating User');
  });
});


describe('testing server for signin', () =>{
  it ('should sign in to a user account', async () => {
    await request.post('/signup').send({
      username: 'ibrahim',
      password: '1234'
    }).then(async (data) => {
        let encodedString = base64.encode(`${data.request._data.username}:${data.request._data.password}`)
        const response = await request.post('/signin').set(
          'Authorization', `Basic ${encodedString}`
        );
        expect(response.status).toEqual(200);
        expect(response.body.password).toBeDefined();
        expect(response.body.username).toEqual('ibrahim')
    });
  });
});

describe('testing middleware and requirement assertion', () =>{
  it ('Middleware basic Authentication ', async () => {

    const response = await request.post('/signin').set(
      'Authorization', ``
    );
    expect(response.status).toEqual(403);

  });
});

