import test from 'ava'
import request from 'supertest'
import app from '../app'

// const url = 'http://localhost:9527'

test('blog-api', async t => {
  const res = await request(app.listen(9527)).get('/api/blog')
  t.is(res.status, 401)
})
