import React, { PureComponent } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import PrivateRoute from '../common/PrivateRoute'
import AsyncLoadComponent from '../common/AsyncLoadComponent'

import NotFound from '../common/NotFound'

import './styles.less'

const AsyncSignup = AsyncLoadComponent(() => import('../Auth/Signup'))
const AsyncLogin = AsyncLoadComponent(() => import('../Auth/Login'))
const AsyncResetPassword = AsyncLoadComponent(() => import('../Auth/ResetPassword'))
const AsyncForgotPassword = AsyncLoadComponent(() => import('../Auth/ForgotPassword'))

class App extends PureComponent {
  componentDidCatch(error, errorInfo) {
    window.Raven.captureException(error, { extra: errorInfo })
  }

  render() {
    return (
      <div className="hs-app-container">
        <Switch>
          <Route path="/signup" component={AsyncSignup} />
          <Route path="/login" component={AsyncLogin} />
          <Route path="/resetPassword" component={AsyncResetPassword} />
          <Route path="/forgotPassword" component={AsyncForgotPassword} />

          <Route path="/publichome" component={() => <div>Hello</div>} />
          <Route path="/404" render={NotFound} />
          <PrivateRoute path="/privatehome" component={() => {}} />

          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
