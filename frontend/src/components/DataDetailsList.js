import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
export default class DataDetailsList extends Component {
    
    render() {
        let value = this.props.value;
        let buttons;
        if(this.props.type === "array"){
            buttons = this.props.value.map((array)=> {
                return (
                    <Button variant="light" className="p-1 m-1 buttonclass">{array}</Button>
                );
            })
            value = buttons
        }
        return (
            <li>
                <div>
                    <span className="h6">{this.props.label}:</span> {value}
                </div>
            </li>
        )
    }
}
