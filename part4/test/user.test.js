const User=require('../model/User')
const helper=require('../utilities/list_helper')
const supertest=require('supertest')
const app=require('../app')
const api=supertest(app)
describe('test when user creation failed',()=>{
 beforeEach(async()=>{
     User.deleteMany()
 })
 
 test('user creation faild when  user is taken',async()=>{
     const newUser={
         username:"man",
         name:"itme",
         password:"123er",
     }
     const result=await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
     expect(result.body.error).toContain('this username is taken')
 })
 test('user creation failed when username is less than there characters long',async()=>{
    const newUser={
        username:"m",
        name:"itme",
        password:"123er",
    }
    const result=await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('username or password is miising? ,it must minimum three characters long')
 })
 test('user creation failed when password is less than there characters long',async()=>{
    const newUser={
        username:"mvv",
        name:"itme",
        password:"12",
    }
    const result=await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('username or password is miising? ,it must minimum three characters long')
 })
})