import React, { Component } from 'react'

export default class TableData extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.Name}</td>
                <td>{this.props.noofstudents}</td>
                <td>{this.props.Location}</td>
                <td>{this.props.Coursesoffered}</td>
                <td>{this.props.Yearfounded}</td>
            </tr>
        )
    }
}
