import Application from 'koa'
import jwtGenerator, {
  SignOptions,
  TokenExpiredError,
  VerifyOptions
} from 'jsonwebtoken'
import { RouterContext } from 'koa-router'

class Token {
  /**
   * 令牌的 secret 值，用于令牌加密
   */
  public secret: string | undefined

  /**
   * access token
   */
  public accessExp: number = 60 * 60

  /**
   * access token 默认的过期时间
   */
  public refreshExp: number = 60 * 60 * 24

  constructor(secret?: string, accessExp?: number, refreshExp?: number) {
    secret && (this.secret = secret)
    refreshExp && (this.refreshExp = refreshExp)
    accessExp && (this.accessExp = accessExp)
  }

  public initApp(
    app: Application,
    secret: string,
    accessExp?: number,
    refreshExp?: number
  ) {
    app.context.jwt = this
    secret && (this.secret = secret)
    accessExp && (this.accessExp = accessExp)
    refreshExp && (this.refreshExp = refreshExp)
  }

  /**
   * 生成 access_token
   * @param identity
   */
  public createAccessToken(identity: string | number) {
    if (!this.secret) {
      throw new Error('secret can not be empty')
    }
    let exp: number = Math.floor(Date.now() / 1000) + this.accessExp
    return jwtGenerator.sign(
      {
        exp,
        identity,
        scope: 'cola',
        type: 'access'
      },
      this.secret
    )
  }

  /**
   * 生成 refresh_token
   * @param identity 标识位
   */
  public createRefreshToken(identity: string | number) {
    if (!this.secret) {
      throw new Error('secret can not be empty')
    }
    let exp = Math.floor(Date.now() / 1000) + this.refreshExp
    return jwtGenerator.sign(
      {
        exp,
        identity,
        scope: 'cola',
        type: 'refresh'
      },
      this.secret
    )
  }

  public verifyToken(token: string, type = 'access') {
    if (!this.secret) {
      throw new Error('secret can not be empty')
    }

    let decode

    try {
      decode = jwtGenerator.verify(token, this.secret)
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        if (type === 'access') {
          throw new Error('出错了')
        }
      }
    }
    return decode
  }
}

const jwt = new Token()

export function createAccessToken(
  payload: string | object,
  options?: SignOptions
) {
  let exp: number = Math.floor(Date.now() / 100) + jwt.accessExp
  if (typeof payload === 'string') {
    return jwtGenerator.sign(
      { indentify: payload, type: 'access', exp: jwt.accessExp },
      jwt.secret!,
      options
    )
  } else {
    return jwtGenerator.sign(
      {
        ...payload,
        type: 'access',
        exp: exp
      },
      jwt.secret!,
      options
    )
  }
}

export function createRefreshToken(
  payload: string | object,
  opitons?: SignOptions
) {
  let exp: number = Math.floor(Date.now() / 1000) + jwt.refreshExp
  if (typeof payload === 'string') {
    return jwtGenerator.sign(
      {
        indentify: payload,
        type: 'refresh',
        exp: jwt.refreshExp
      },
      jwt.secret!,
      opitons
    )
  }
}

export function verifyAccessToken(token: string, options?: VerifyOptions) {
  let decode
  try {
    decode = jwtGenerator.verify(token, jwt.secret!, options)
  } catch (err) {
    throw new Error('出错了')
  }

  return decode
}

export function getTokens(user: any) {
  const accessToken = jwt.createAccessToken(user.id)
  const refreshToken = jwt.createRefreshToken(user.id)
  return {
    accessToken,
    refreshToken
  }
}

export function parseHeader(ctx: RouterContext, type = 'access') {
  if (!ctx.header || !ctx.header.authorization) {
    ctx.throw(401, new Error('没有权限'))
  }
  const parts = ctx.header.authorization.split(' ')

  if (parts.length === 2) {
    const schema = parts[0]
    const token = parts[1]

    if (/^Bearer$/i.test(schema)) {
      const obj = (ctx as any).jwt.verifyToken(token, type)
      if (!obj.type || obj.type !== type) {
        ctx.throw(401, '权限已过期')
      }
      return obj
    }
  } else {
    ctx.throw(401, '无权限')
  }
}
