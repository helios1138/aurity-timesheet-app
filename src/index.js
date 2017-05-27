import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { configureStore } from './store/configure-store'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <div>It's working</div>
  </Provider>,
  document.getElementById('root')
)
