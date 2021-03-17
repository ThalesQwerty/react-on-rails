import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

function Main() {
    return <div>
        <h1>
        Hello World!
        </h1>
        <p>
        Well, it seems like React is working :)
        </p>
    </div>
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Main />,
        document.body.appendChild(document.createElement('div')),
    )
})
