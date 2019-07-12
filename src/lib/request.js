// NOTE: Use the request function for all standard requests for consistency.
import axios, { CancelToken } from 'axios'
import isEmpty from 'lodash/isEmpty'
import qs from 'qs'
import config from '../config'

axios.defaults.withCredentials = true
const requestMethods = {
  GET: axios.get,
  POST: axios.post,
  PUT: axios.put,
  DELETE: axios.delete
}

const errorWrapper = fn => async (...args) => {
  try {
    const response = await fn.apply(this, [...args])
    return response
  } catch (e) {
    // The request was made and the server responded with a status code that falls out of the range of 2xx
    if (e.response) {
      return { errors: e.response }
    }
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest
    if (e.request) {
      return { errors: e.request }
    }
    return { errors: e.message }
  }
}

export const request = async (path, options = {}) => {
  // eslint-disable-next-line prefer-const
  let { method = 'GET', body, params = {}, headers: headerOptions, cancel, ...rest } = options

  // cancel is a react component value like: this.cancelRequest = () => {}
  // In the component, you can cancel the request like this:
  // request(url, { data, cancel: this.cancelRequest })
  // componentWillUnmount() {
  //   this.cancelRequest()
  // }
  // eslint-disable-next-line
  const canceller = { cancelToken: cancel ? new CancelToken(c => (cancel = c)) : null }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headerOptions
  }

  const paramsPath = !isEmpty(params) ? `?${qs.stringify(params)}` : ''
  const endpoint = `${config.apiRoot}/api/v1/${path.replace(/^\//, '')}${paramsPath}`

  let response = {}
  if (method === 'GET') {
    response = await requestMethods.GET(endpoint, { headers, ...canceller })
  } else if (method === 'DELETE') {
    // If you need a req. body for DELETE, ...rest should include data: { foo: 'bar' }
    response = await requestMethods.DELETE(endpoint, { headers, ...rest, ...canceller })
  } else if (requestMethods[method]) {
    response = await requestMethods[method](endpoint, body, { headers, ...rest, ...canceller })
  }

  if (response.data) return response.data
  throw new Error(`Incorrect method option. Options include ${Object.keys(requestMethods).join(' ')}`)
}

export default errorWrapper(request)
