import React from 'react'
import ReactDOM from 'react-dom'
import Titles from './titles'
import App from './App'

import { render, fireEvent, cleanup, waitForDomChange } from 'react-testing-library'

// this adds jest-dom's custom assertions
import 'jest-dom/extend-expect'
import "wait-for-expect"

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders title', () => {
  const { getByText } = render(<App />)
  expect(getByText('Weather Scanner')).toBeInTheDocument()
})

const setup = () => {
  const utils = render(<Titles />)
  const input = utils.getByPlaceholderText('Location...')
  const form = document.getElementById('form')
  return {
    utils,
    input,
    form
  }
}

afterEach(cleanup)

test('It should allow input Turku', () => {
  const { input } = setup()
  fireEvent.change(input, { target: { value: 'Turku' } })
  expect(input.value).toBe('Turku')
})

test('It should show weather for Turku', () => {
  const { input, form, utils } = setup()
  fireEvent.change(input, { target: { value: 'Turku' } })
  fireEvent.submit(form)
  waitForDomChange({ utils })
  .then(() => expect(utils.getByText('Turku, Finland')).toBeInTheDocument())
})

test('It should show error for jyvä', () => {
  const { input, form, utils } = setup()
  fireEvent.change(input, { target: { value: 'jyvä' } })
  fireEvent.submit(form)
  waitForDomChange({ utils })
  .then(() => expect(utils.getByText('No matching location found.')).toBeInTheDocument())
})

test('It should add Turku to favorites', () => {
  const { input, form, utils } = setup()
  fireEvent.change(input, { target: { value: 'Turku' } })
  fireEvent.submit(form)

  expect(utils.queryByText("Favorites Turku")).toBeNull()

  waitForDomChange({ utils })
  .then(function() {
    fireEvent.click(getByText("Add to Favorites"))
    waitForDomChange({ utils })
    .then(() => expect(utils.getByText('Favorites Turku')).toBeInTheDocument())
  })
})