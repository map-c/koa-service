class SuccessModel {
  data: object
  message: string = ''
  constructor(data: any, message?: string) {
    this.data = data
    message ? (this.message = message) : ''
  }
}

class ErrorModel {
  reuslt: boolean = false
  message: string = ''
  constructor(message: string) {
    this.message = message
  }
}

export { SuccessModel, ErrorModel }
