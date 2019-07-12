import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import qs from 'qs'
import { Grid, Header, Message } from 'semantic-ui-react'
import get from 'lodash/get'

import request from '../../../lib/request'

import CommonContainer from '../../common/CommonContainer'
import { updateLoginStatus } from '../reducer'
import { updateCurrentUser, updateTenant } from '../../App/reducer'
import SignupForm from './Form'

import './styles.less'

class Signup extends React.Component {
  state = {
    error: '',
    email: '',
    firstName: '',
    lastName: ''
  }

  async componentDidMount() {
    const { invitationToken } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    const response = await request(`/users/invite/${invitationToken}`)
    if (response.errors) {
      return this.props.history.replace('/404')
    }
    const { email, firstName, lastName } = response.result
    this.setState({ email, firstName, lastName })
  }

  onSubmit = async ({ email, firstName, lastName, password, passwordRepeat }) => {
    const { history, location, updateLoginStatus, updateCurrentUser, updateTenant } = this.props
    const { invitationToken } = qs.parse(location.search, { ignoreQueryPrefix: true })
    const response = await request('/users', {
      method: 'POST',
      body: { email, firstName, lastName, password, passwordRepeat, invitationToken }
    })

    if (!response.errors && get(response, 'result.user.email')) {
      updateLoginStatus(true)
      updateCurrentUser({ ...get(response, 'result.user') })
      updateTenant({ ...get(response, 'result.tenant') })
      return history.push('/people')
    }
    const error = get(response, 'errors.data.error.message')
    this.setState({ error })
  }

  handleChange = () => this.state.error && this.setState({ error: '' })

  render() {
    const { error, email, firstName, lastName } = this.state
    return (
      <div className="signup-form">
        <CommonContainer>
          <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                Signup for an account
              </Header>
              <SignupForm
                onSubmit={this.onSubmit}
                errors={error}
                handleChange={this.handleChange}
                email={email}
                firstName={firstName}
                lastName={lastName}
              />
              <Message>
                Have an account? <Link to="/login">Log in</Link>
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
)(withRouter(Signup))
