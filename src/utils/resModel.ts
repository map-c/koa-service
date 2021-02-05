class SuccessModel {
  result: boolean = true
  data: object
  message: string
  constructor(data: any, message: string) {
    this.data = data
    this.message = message
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
