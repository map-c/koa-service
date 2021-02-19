import Router from 'koa-router'
import Contorl from '../controller/product/index'

const instance = new Router({
  prefix: '/api/product'
})

instance
  .get('/:id', Contorl.getProductlist)
  .post('/', Contorl.createProduct)
  .put('/', Contorl.updateProductInfo)
  .del('/:id', Contorl.delete)

export default instance
