import validator from 'validator'

export const isValidEmail = email => email && validator.isEmail(email)
export const isValidName = (name = '') => /^[A-Za-z\s-]+$/.test(name.trim())

export const createUserFormValidators = {
  email: email => isValidEmail(email),
  // Allow spaces and hyphens for names
  firstName: name => name && isValidName(name),
  lastName: name => name && isValidName(name),
  role: role => !!role
}

export const surveyPersonalFormValidators = {
  company: () => true,
  email: email => validator.isEmail(email),
  externalId: id => id && id.length > 1,
  gender: gender => gender === 'M' || gender === 'F',
  // Allow spaces and hyphens for names
  firstName: (name = '') => isValidName(name),
  lastName: (name = '') => isValidName(name),
  title: () => true,
  phone: phone => validator.isMobilePhone(phone, 'en-US')
}

export const authValidators = {
  email: email => (email && !validator.isEmail(email) ? 'Not a valid email address' : null),
  firstName: name => (!isValidName(name) ? 'Not a valid first name' : null),
  lastName: name => (!isValidName(name) ? 'Not a valid last name' : null),
  password: password => (password && password.length < 8 ? 'Password must have at least 8 characters' : null),
  passwordRepeat: (passwordRepeat, { password }) => (passwordRepeat !== password ? 'Passwords do not match' : null)
}

// NOTE: taken from here: https://github.com/miguelmota/is-valid-domain/blob/master/is-valid-domain.js
// Input examples: 'gmail.com' returns true, 'gmail.ai, another.com' returns true
// 'gmail.ai, notreal' returns false
export const isValidEmailDomain = v => {
  if (typeof v !== 'string') return false
  let isValid = false
  const domains = v.split(',')

  domains.forEach(domain => {
    const parts = domain.trim().split('.')
    if (parts.length <= 1) {
      isValid = false
      return
    }

    const tld = parts.pop()
    const tldRegex = /^(?:xn--)?[a-zA-Z0-9]+$/gi

    if (!tldRegex.test(tld)) {
      isValid = false
      return
    }

    isValid = parts.every(host => {
      const hostRegex = /^(?!:\/\/)([a-zA-Z0-9]+|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])$/gi

      return hostRegex.test(host)
    })
  })

  return isValid
}
