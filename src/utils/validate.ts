import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const ajv = new Ajv()
addFormats(ajv)

export function valid(schema: any) {
  const validate = ajv.compile(schema)
  return validate
}
