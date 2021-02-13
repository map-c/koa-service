class SuccessModel {
  result: boolean = true
  data: object
  message: string = ''
  constructor(data: any, message?: string) {
    this.data = data
    message ? (this.message = message) : ''
    this.result = true
  }
}

class ErrorModel {
  reuslt: boolean = false
  message: string = ''
  constructor(message: string) {
    this.reuslt = false
    this.message = message
  }
}

export { SuccessModel, ErrorModel }
