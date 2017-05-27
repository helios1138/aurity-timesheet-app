import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { configureStore } from './store/configure-store'
import { Root } from './components/root'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
