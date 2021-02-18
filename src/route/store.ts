import Router from 'koa-router'
import Control from '../controller/stroe/index'

const instance = new Router({
  prefix: '/api/store/'
})

instance
  .get('/:id', Control.getStoreByUserId)
  .post('/create', Control.createStore)
  .put('/update', Control.updateStore)

export default instance
