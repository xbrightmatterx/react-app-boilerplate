import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import FormInput from '../../../common/ReduxFormInput'
import { authValidators as validators } from '../../../../lib/validators'

const ResetPasswordForm = ({ errors, handleChange, handleSubmit }) => (
  <Form error size="large" onSubmit={handleSubmit}>
    <Form.Field>
      <Field
        component={FormInput}
        as={Input}
        onChange={handleChange}
        name="email"
        icon="user"
        iconPosition="left"
        placeholder="Email Address"
        type="text"
        validate={validators.email}
      />
    </Form.Field>
    <Form.Field>
      <Field
        component={FormInput}
        as={Input}
        onChange={handleChange}
        name="password"
        icon="lock"
        iconPosition="left"
        placeholder="New Password"
        type="password"
        validate={validators.password}
      />
    </Form.Field>
    <Form.Field>
      <Field
        component={FormInput}
        as={Input}
        onChange={handleChange}
        name="passwordRepeat"
        icon="lock"
        iconPosition="left"
        placeholder="Repeat New Password"
        type="password"
        validate={[validators.password, validators.passwordRepeat]}
      />
    </Form.Field>
    {errors && <Message error content={errors} />}
    <Button color="teal" fluid size="large">
      Reset Password
    </Button>
  </Form>
)

ResetPasswordForm.propTypes = {
  email: PropTypes.string,
  errors: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

const mapStateToProps = (state, { email }) => ({ initialValues: { email } })
const reduxDecoratedForm = reduxForm({ form: 'resetpassword', enableReinitialize: true })(ResetPasswordForm)
export default connect(
  mapStateToProps,
  null
)(reduxDecoratedForm)
