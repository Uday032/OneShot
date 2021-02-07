import React, { Component } from 'react'

export default class TableDataStudent extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.Name}</td>
                <td>{this.props.Skills}</td>
                <td>{this.props.BatchYear}</td>
            </tr>
        )
    }
}
