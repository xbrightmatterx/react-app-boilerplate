import React from 'react'
import { Container } from 'semantic-ui-react'

const CommonContainer = ({ children }) => (
  <Container text style={{ maxHeight: '100vh', height: '100%' }}>
    {children}
  </Container>
)

export default CommonContainer
