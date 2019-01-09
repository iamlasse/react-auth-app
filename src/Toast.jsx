import React from 'react';
import PropTypes from 'prop-types'
import './Toast.scss'

class Toast extends React.Component {

  getIcon() {
    const { level } = this.props
    switch (level) {
      case 'warning': return 'http://svgshare.com/i/19x.svg'
      case 'danger': return 'http://svgshare.com/i/19E.svg'
      case 'success': return 'http://svgshare.com/i/19y.svg'
      default:
        return ''
    }
  }

  render() {
    const { level, message, visible } = this.props

    let classes = `toast ${level} `
    classes += visible ? 'visible' : ''
    return (
      <div className={classes}>
        <figure>
          <img alt='Icon' src={this.getIcon()} />
        </figure>
        <p>{message}</p>
      </div>
    )
  }
}

Toast.propTypes = {
  level: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
}

export default Toast