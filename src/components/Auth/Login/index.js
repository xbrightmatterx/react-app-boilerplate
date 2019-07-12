import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Grid, Header, Message } from 'semantic-ui-react'
import get from 'lodash/get'

import { updateLoginStatus } from '../reducer'
import { updateCurrentUser, updateTenant } from '../../App/reducer'

import CommonContainer from '../../common/CommonContainer'
import request from '../../../lib/request'
import LoginForm from './Form'

import './styles.less'

class Login extends React.Component {
  state = { error: '' }

  onSubmit = async params => {
    const {
      location,
      history: { push },
      updateLoginStatus,
      updateCurrentUser,
      updateTenant
    } = this.props
    // FIXME: need proper error handling below
    if (!params.email) return
    const response = await request('/users/sessions', { method: 'POST', body: { ...params, email: params.email.toLowerCase() } })

    if (!response.errors && get(response, 'result.user.id')) {
      updateLoginStatus(true)
      updateCurrentUser({ ...get(response, 'result.user') })
      updateTenant({ ...get(response, 'result.tenant') })
      const prevUrl = get(location, 'state.from')
      if (prevUrl) {
        return push(`${prevUrl.pathname}${prevUrl.search}`)
      }
      // If user role is manager, then go to "My People"
      const userRoles = get(response, 'result.user.roles', [])
      if (userRoles.length === 1 && userRoles[0] === 'manager') {
        return push('/people/my')
      }
      return push('/people')
    }

    const error = get(response, 'errors.data.error.message')
    this.setState({ error: error === 'Incorrect email or password' ? error : 'Your email or password is incorrect. Try again.' })
    updateLoginStatus(false)
  }

  handleChange = () => this.state.error && this.setState({ error: '' })

  render() {
    return (
      <div className="login-form">
        <CommonContainer>
          <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                Log in to your account
              </Header>
              <LoginForm onSubmit={this.onSubmit} errors={this.state.error} handleChange={this.handleChange} />
              <Message>
                Forgot your password? <Link to="/forgotPassword">Reset it</Link>
              </Message>
            </Grid.Column>
          </Grid>
        </CommonContainer>
      </div>
    )
  }
}

const mapDispatchToProps = { updateLoginStatus, updateCurrentUser, updateTenant }

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Login))
