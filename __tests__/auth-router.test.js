'use strict'

process.env.SECRET = 'cool';

const { server } = require('../src/server.js')
const supergoose = require('@code-fellows/supergoose')
const supertest = require('supertest')
const bearer = require('../src/auth/middleware/bearer.js')

const Users = require('../src/auth/models/users.js')

const mockRequest = supergoose(server);

let users = [
  { username: 'admin', password: '1234', role: 'admin'},
  { username: 'editor', password: '1234', role: 'editor'},
  { username: 'user', password: '1234', role: 'user'}
]

describe('WEB SERVER', () => {
  it ('should respond with a 404 on not found', async() => {
    return mockRequest.get('/wrong-route').then(data => {
      expect(data.status).toBe(404)
    })
  })
})

describe('AUTH Routes', () => {
  it('can sign up a new user', async() => {
    const response = await mockRequest.post('/signup').send(users[2])
    const userObj = response.body;
    // console.log(userObj)
    expect(response.status).toBe(201)
    expect(userObj.token).toBeDefined();
    expect(userObj.user.role).toEqual('user')
  })

  it('can signin the user with basic authetication', async () => {
    const response = await mockRequest.post('/signin')
      .auth(users[2].username, users[2].password)

      const userObj = response.body;
      
      expect(response.status).toBe(200);
      expect(userObj.token).toBeDefined();
      expect(userObj.user.username).toEqual(users[2].username)
      expect(userObj.user.capabilities[0]).toEqual('read')
  })

  it('can signin the user with bearer and ACL authentification', async () => {
    const signup = await mockRequest.post('/signup').send(users[0])
    const response = await mockRequest.post('/signin')
      .auth(users[0].username, users[0].password)
    
    const token = response.body.token;

    const bearerRes = await mockRequest
      .get('/users')
      .set('Authorization', `Bearer ${token}`)

      expect(bearerRes.status).toBe(200);
  })

  it('should fail sign in with wrong password', async () => {
    const signup = await mockRequest.post('/signup').send(users[1])
    const response = await mockRequest.post('/signin')
      .auth('editor', '1111')

      expect(response.status).toBe(403);
      expect(response.body.user).not.toBeDefined()
  })

  it('should fail sign in with uknown user', async () => {
    const response = await mockRequest.post('/signin')
      .auth('uknowUser', '1234')
    
      expect(response.status).toBe(403);
      expect(response.body.user).not.toBeDefined()
  })


})