import React from 'react'
import { render, screen } from '@testing-library/react'
import ContactsList from '../components/ContactsList'

test('renders ContactsList input', () => {
  render(<ContactsList onSelect={() => {}} />)
  expect(screen.getByLabelText(/Search contacts/i)).toBeInTheDocument()
})
