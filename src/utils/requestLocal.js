import { Message } from 'element-ui'

export default (response) => {
  if (response.status !== 200) {
    Message({
      message: response.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject('error')
  }
  return Promise.resolve({ data: response })
}
