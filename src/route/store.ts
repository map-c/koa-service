import Router from 'koa-router'
import Control from '../controller/stroe/index'

const instance = new Router({
  prefix: '/api/store'
})

instance.get('/', Control.getStoreByUserId)
instance.post('/create', Control.createStore)
instance.put('/update', Control.updateStore)

export default instance
