import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import FormInput from '../../../common/ReduxFormInput'
import { authValidators as validators } from '../../../../lib/validators'

const SignupForm = ({ errors, handleChange, handleSubmit }) => (
  <Form error size="large" onSubmit={handleSubmit}>
    <Form.Group widths="equal">
      <Form.Field>
        <Field
          component={FormInput}
          as={Input}
          onChange={handleChange}
          name="firstName"
          placeholder="First Name"
          type="text"
          validate={validators.firstName}
        />
      </Form.Field>
      <Form.Field>
        <Field
          component={FormInput}
          as={Input}
          onChange={handleChange}
          name="lastName"
          placeholder="Last Name"
          type="text"
          validate={validators.lastName}
        />
      </Form.Field>
    </Form.Group>
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
        placeholder="Password"
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
        placeholder="Repeat Password"
        type="password"
        validate={[validators.password, validators.passwordRepeat]}
      />
    </Form.Field>
    {errors && <Message error content={errors} />}
    <Button color="teal" fluid size="large">
      Login
    </Button>
  </Form>
)

SignupForm.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  errors: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

const mapStateToProps = (state, { email, firstName, lastName }) => ({ initialValues: { email, firstName, lastName } })
const reduxDecoratedForm = reduxForm({ form: 'signup', enableReinitialize: true })(SignupForm)
export default connect(
  mapStateToProps,
  null
)(reduxDecoratedForm)
