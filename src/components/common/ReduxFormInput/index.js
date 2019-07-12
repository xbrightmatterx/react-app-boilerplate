// NOTE: Used with Redux-Form components
import React from 'react'
import { Message } from 'semantic-ui-react'

export default function FormInput({ input, type, label, meta: { touched, error }, placeholder, as: As = 'input', ...props }) {
  function handleChange(e, { value }) {
    if (props.onChange) props.onChange(value)
    return input.onChange(value)
  }

  return (
    <div>
      <As {...props} {...input} label={label} value={input.value} type={type} placeholder={placeholder} onChange={handleChange} />
      {touched && error && <Message error content={error} />}
    </div>
  )
}
