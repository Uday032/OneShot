import React, { Component } from 'react'

import {Table} from 'react-bootstrap'
import TableData from './TableData'
import TableDataStudent from './TableDataStudent'

export default class TableHeader extends Component {
    render() {
        let formatedtable;
        if(this.props.dataname==="College") {
            formatedtable =  (
                this.props.data.map((college) => {
                    return(
                        <TableData 
                            Name = {college.name}
                            noofstudents = {college.no_of_students}
                            Location = {college.city + ", "+ college.state +", "+ college.country} 
                            Coursesoffered = {college.courses} 
                            Yearfounded = {college.yearfounded} 
                        />
                    )
                })
            );
        } 

        if(this.props.dataname==="Student") {
            formatedtable =  (
                this.props.data.map((student) => {
                    return(
                        <TableDataStudent 
                            Name = {student.name}
                            Skills = {student.skills}
                            BatchYear = {student.batchyear} 
                        />
                    )
                })
            );
        } 

        return (
            <Table responsive>
                <thead>
                    <tr>
                    {
                        this.props.header.map((heading) => {
                            return(
                            <th>{heading}</th>
                            )
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                    {formatedtable}
                    

                    
                </tbody>
            </Table>
        )
    }
}
