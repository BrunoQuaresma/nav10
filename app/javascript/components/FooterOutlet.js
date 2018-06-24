import React, { Component } from 'react'
import { Outlet } from 'react-outlet'

export default class FooterOutlet extends Component {
  render() {
    return <Outlet outletId="footerOutlet" />
  }
}