import Router from 'koa-router'
import Contorller from '../controller/blog'

const instance = new Router({
  prefix: '/api/blog'
})

instance
  .get('/', Contorller.findBlog)
  .post('/', Contorller.addBlog)
  .patch('/', Contorller.updateBlog)

export default instance
