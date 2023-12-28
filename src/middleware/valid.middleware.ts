import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { IRequest, error } from 'itty-router'
import map from 'lodash/map'

export const validationMiddleware = async (req: IRequest) => {
  req.$v = (async (cls, obj) => {
    const dtoInstance = plainToClass(cls as any, obj)
    const errors = await validate(dtoInstance)

    if (errors.length > 0) {
      return error(200, {
        error: errors.map(error => map(error.constraints)).flat()
      })
    }

    return { ...obj }
  }) as Validation

  req.$v.query = cls => req.$v(cls, req.query)
  req.$v.body = async cls => req.$v(cls, await req.json())
}
