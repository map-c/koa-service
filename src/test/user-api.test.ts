import test from 'ava'
import request from 'supertest'
import '../app'

test('demo is', t => {
  t.pass()
})

test.cb('api user test', t => {
  request('http://localhost:9527')
    .get('/api/user/test')
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .expect(401)
    .end(t.end)
})
