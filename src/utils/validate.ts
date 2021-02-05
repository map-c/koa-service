// import Ajv from 'ajv'
// import addFormats from 'ajv-formats'
const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const ajv = new Ajv.default()
addFormats(ajv)

export function valid(schema: any) {
  const validate = ajv.compile(schema)
  return validate
}
