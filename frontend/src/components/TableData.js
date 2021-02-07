import React, { Component } from 'react'
import {Button} from 'react-bootstrap'

export default class TableData extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.Name}</td>
                <td>{this.props.noofstudents}</td>
                <td>{this.props.Location}</td>
                <td>
                    {
                        this.props.Coursesoffered.map((course)=>{
                            return (
                                <Button variant="light" className="p-1 m-1 buttonclass">{course}</Button>
                            );
                        })
                    }
                </td>
                <td>{this.props.Yearfounded}</td>
            </tr>
        )
    }
}
