import React, { Component } from 'react'
import {Button} from 'react-bootstrap'

export default class TableDataStudent extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.Name}</td>
                <td>
                    {this.props.Skills.map((skill)=>{
                        return (
                            <Button variant="light" className="p-1 m-1 buttonclass">{skill}</Button>
                        );
                    })}
                </td>
                <td>{this.props.BatchYear}</td>
            </tr>
        )
    }
}
