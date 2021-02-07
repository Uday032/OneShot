import React, { Component } from 'react'

export default class DataDetailsList extends Component {
    render() {
        return (
            <li>
                <div>
                    <span className="h6">{this.props.label}:</span> {this.props.value}
                </div>
            </li>
        )
    }
}
