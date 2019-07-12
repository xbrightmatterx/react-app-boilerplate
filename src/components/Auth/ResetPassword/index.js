import React from 'react'
import { withRouter } from 'react-router-dom'
import qs from 'qs'
import { Grid, Header } from 'semantic-ui-react'
import get from 'lodash/get'

import CommonContainer from '../../common/CommonContainer'
import request from '../../../lib/request'
import ResetPasswordForm from './Form'

import './styles.less'

class ResetPassword extends React.Component {
  state = {
    error: '',
    email: ''
  }

  onSubmit = async params => {
    const { resetPasswordToken } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    const response = await request('/users/password/reset', {
      method: 'POST',
      body: { ...params, resetPasswordToken }
    })

    if (!response.errors && get(response, 'result.success')) {
      return this.props.history.replace('/login')
    }
    const error = get(response, 'errors.data.error.message')
    this.setState({ error })
  }

  async componentDidMount() {
    const { resetPasswordToken } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    const response = await request(`/users/password/reset/${resetPasswordToken}`)
    if (response.errors) {
      return this.props.history.replace('/404')
    }
    const email = get(response, 'result.email')
    this.setState({ email })
  }

  handleChange = () => this.state.error && this.setState({ error: '' })

  render() {
    const { error, email } = this.state
    return (
      <div className="reset-password-form">
        <CommonContainer>
          <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                Reset password for your account
              </Header>
              <ResetPasswordForm onSubmit={this.onSubmit} errors={error} handleChange={this.handleChange} email={email} />
            </Grid.Column>
          </Grid>
        </CommonContainer>
      </div>
    )
  }
}

export default withRouter(ResetPassword)
