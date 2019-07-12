/* eslint-disable no-underscore-dangle */
import React from 'react'
import { render } from 'react-dom'
import { Route, BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from './components/App'

import './styling/globalStyles.less'
import './styling/semantic.less'

import reducers from './reducerSource'

const middleware = [thunk]

const finalCreateStore = compose(
  applyMiddleware(...middleware),
  (STAGE !== 'staging' || STAGE !== 'production') && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)(createStore)

const store = finalCreateStore(reducers)

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
