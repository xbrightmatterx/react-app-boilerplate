import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import get from 'lodash/get'

import CommonContainer from '../../common/CommonContainer'
import request from '../../../lib/request'
import ForgotPasswordForm from './Form'

import './styles.less'

class ForgotPassword extends React.Component {
  state = {
    success: false,
    error: ''
  }

  onSubmit = async params => {
    const response = await request('/users/password/forgot', { method: 'POST', body: params })

    if (!response.errors && get(response, 'result.success')) {
      this.setState({ success: true })
    } else {
      const error = get(response, 'errors.data.error.message')
      this.setState({ error })
    }
  }

  handleChange = () => this.state.error && this.setState({ error: '' })

  render() {
    const { success, error } = this.state
    return (
      <div className="forgot-password-form">
        <CommonContainer>
          <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                {success ? 'Thanks!' : 'Forgot your password?'}
              </Header>
              {success ? (
                <div>Please check your email for instructions on how to reset your password.</div>
              ) : (
                <ForgotPasswordForm onSubmit={this.onSubmit} errors={error} handleChange={this.handleChange} />
              )}
            </Grid.Column>
          </Grid>
        </CommonContainer>
      </div>
    )
  }
}

export default ForgotPassword
