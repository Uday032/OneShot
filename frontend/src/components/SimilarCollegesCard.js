import React, { Component } from 'react'

import {Card} from 'react-bootstrap'
import DataDetailsList from './DataDetailsList'

export default class SimilarCollegesCard extends Component {
    render() {
        return (
            <Card border="dark">
                <Card.Body>
                <Card.Title>{this.props.collegename}</Card.Title>
                <Card.Text>
                    <ul>
                        <DataDetailsList label="Year Founded" value={this.props.collegeyearfounded} />
                        <DataDetailsList label="No. of Students" value={this.props.collegenoofstudents} />
                        <DataDetailsList label="Location" value={this.props.collegecity+", "+ this.props.collegestate+", "+ this.props.collegecountry} />
                        <DataDetailsList label="Courses Provided" value={this.props.coursesoffered} type="array"/>

                    </ul>
                    
                </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}
