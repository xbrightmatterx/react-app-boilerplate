// import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
// eslint-disable-next-line import/no-extraneous-dependencies
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

const title = 'Initial React Webpack Setup'

ReactDOM.render(
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" render={() => <div>{title}</div>} />
        <Route path="/hello" render={() => <div>HELLO</div>} />
      </Switch>
    </div>
  </Router>,
  document.getElementById('app')
)
