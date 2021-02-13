import { Next } from 'koa'
import Router, { RouterContext } from 'koa-router'
import Control from '../controller/album'

const albumRouter = new Router({
  prefix: '/api/album'
})

/**
 * 获取相册列表
 */
albumRouter.get('/', Control.getAlbum)

/**
 * 新建相册
 */
albumRouter.post('/', Control.create)

/**
 * 删除相册
 */
albumRouter.del('/:id', Control.del)

export default albumRouter
