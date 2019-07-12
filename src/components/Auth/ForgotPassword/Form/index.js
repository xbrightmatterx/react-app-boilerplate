import React from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import FormInput from '../../../common/ReduxFormInput'
import { authValidators as validators } from '../../../../lib/validators'

const ForgotPasswordForm = ({ errors, handleSubmit, handleChange }) => (
  <Form error size="large" onSubmit={handleSubmit}>
    <Form.Field>
      <Field
        component={FormInput}
        as={Input}
        onChange={handleChange}
        name="email"
        icon="user"
        iconPosition="left"
        placeholder="E-mail Address"
        type="text"
        validate={validators.email}
      />
    </Form.Field>
    {errors && <Message error content={errors} />}
    <Button color="teal" fluid size="large">
      Reset Password
    </Button>
  </Form>
)

export default reduxForm({
  form: 'forgotpassword'
})(ForgotPasswordForm)
