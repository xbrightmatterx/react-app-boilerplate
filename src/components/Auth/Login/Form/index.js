import React from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import FormInput from '../../../common/ReduxFormInput'

const LoginForm = ({ errors, handleSubmit, handleChange }) => (
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
      />
    </Form.Field>
    {errors && <Message error content={errors} />}
    <Button color="teal" fluid size="large">
      Log In
    </Button>
  </Form>
)

export default reduxForm({
  form: 'login'
})(LoginForm)
