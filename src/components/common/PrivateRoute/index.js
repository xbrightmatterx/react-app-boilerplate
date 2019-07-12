// NOTE: Use this whenever you need to use a route that requires authentication.
// Pass in the appropriate role to ensure that the user's ability to access the page is there.
import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import { Dimmer, Loader } from 'semantic-ui-react'

import request from '../../../lib/request'
import { updateLoginStatus } from '../../Auth/reducer'
import { updateCurrentUser } from '../../App/reducer'

class PrivateRoute extends React.Component {
  state = { isFetching: true }

  async componentDidMount() {
    const { isAuthenticated, updateLoginStatus, updateCurrentUser } = this.props
    if (isAuthenticated) return this.setState({ isFetching: false })
    const response = await request('/users/self')
    if (response.errors) {
      return this.setState({ isFetching: false })
    }

    if (response.user.id) {
      updateLoginStatus(true)
      updateCurrentUser({ ...response.user })
    }
    this.setState({ isFetching: false })
  }

  verifyAccess = props => {
    const { component: Component, isAuthenticated } = this.props
    if (this.state.isFetching) {
      return (
        <Dimmer active inverted>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
      )
    }
    if (isAuthenticated) {
      return <Component {...props} />
    }
    return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  }

  render() {
    const { component: Component, ...rest } = this.props
    return <Route {...rest} render={this.verifyAccess} />
  }
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({ isAuthenticated })
const mapDispatchToProps = { updateLoginStatus, updateCurrentUser }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute)
