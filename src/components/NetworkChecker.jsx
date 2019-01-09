import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppToaster from "../constants/AppToaster";
// import Toast from "../Toast";

export default class NetworkChecker extends Component {

  static defaultProps = {
    online: "Online",
    offline: "Offline"
  }

  static propTypes = {
    online: PropTypes.string,
    offline: PropTypes.string,
  }

  componentDidMount() {
    window.addEventListener("offline", this.handleConnectionStatus)
    window.addEventListener("online", this.handleConnectionStatus)
    if (!window.navigator.onLine) {
      this.handleConnectionStatus()
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener("offline", this.handleConnectionStatus)
    window.removeEventListener("online", this.handleConnectionStatus)
  }

  handleConnectionStatus = (event) => {
    const { online, offline } = this.props
    const condition = window.navigator.onLine ? "online" : "offline";
    const message = condition === 'online' ? online : offline
    const intent = condition === 'online' ? 'success' : 'danger'
    console.log(`Network is: ${condition}`, event && event.type);
    AppToaster.show({
      message,
      intent
    })
  }

  render() {
    return (
      null
    )
  }
}
