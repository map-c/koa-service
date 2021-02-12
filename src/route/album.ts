import Router from 'koa-router'
import Control from '../controller/album'

const albumRouter = new Router({
  prefix: '/api/service/album'
})

albumRouter.get('/list', Control.getAlbum)
albumRouter.post('/', Control.create)

export default albumRouter
