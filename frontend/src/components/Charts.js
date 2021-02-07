import React, { Component } from 'react'
import {Button, Row, Col} from 'react-bootstrap'
import {Pie} from 'react-chartjs-2'
import ReactSelect from './ReactSelect'
import TableHeader from './TableHeader'

//AXIOS
import instance from '../axios'


export default class Charts extends Component {
    constructor(){
        super();

        this.handleChartGenerator = this.handleChartGenerator.bind(this);
        this.handleCourseChange = this.handleCourseChange.bind(this);
        this.state = {
            collegecoursesdata: [],
            courseslabels: [],
            selectedcourse: '',
            showchart: Boolean(false),
            specificcoursecolleges: [],
            specificcoursecollegesheader: ['Name', 'No. of Students', 'Location', 'Courses Offered','Year Founded'],
            showspecificcoursetable: 0,
            courseschartdata: {
                labels: [],
                datasets: [
                    {
                        label: 'Courses',
                        backgroundColor: [
                            '#B21F00',
                            '#C9DE00',
                            '#2FDE00',
                            '#00A6B4',
                            '#6800B4',
                            '#6855B4'
                        ],
                        hoverBackgroundColor: [
                            '#501800',
                            '#4B5000',
                            '#175000',
                            '#003350',
                            '#35014F',
                            '#35934F'
                        ],
                        data: []
                    }
                ]
            }
        }
    }

    handleChartGenerator() {
        instance.get('/college/chart/courses')
            .then((res)=>{
                
                const data = {...this.state.courseschartdata.datasets[0], data: res.data.percentage};
                // const label = {...this.state.courseschartdata, labels: res.data.label};
                const newchartdata = {...this.state.courseschartdata, labels: res.data.label, datasets: [data]};
                this.setState({
                    courseschartdata: newchartdata,
                    showchart: Boolean(true),
                    courseslabels: res.data.label.map((labels)=>{
                        return({
                            value: labels,
                            label: labels
                        })
                    })
                })
                console.log(this.state.courseslabels);
            })

    }

    handleCourseChange = selectedcourse => {
        this.setState({selectedcourse});
        let selectcourseurl = '/college/courses/'+selectedcourse.value;
        instance.get(selectcourseurl)
            .then((res)=>{
                this.setState({
                    specificcoursecolleges: res.data,
                    showspecificcoursetable: 1
                })
            })
    }
    render() {
        return (
            <div className="mt-5 mb-5">
                <Button variant="dark" onClick={this.handleChartGenerator}>Generate Chart</Button>{' '}
                <Pie 
                    data={this.state.courseschartdata}
                    options={{
                        title:{
                        display:this.state.showchart,
                        text:'Courses data',
                        fontSize:20
                        },
                        legend:{
                        display: true,
                        position:'right'
                        }
                    }}
                />
                <div className="mt-4" style={{ display: this.state.showchart ? "block" : "none" }}>
                    <Row>
                        <Col md="4">
                            <p>Select Course:</p>
                            <ReactSelect 
                                selectedOption = {this.state.selectedcourse}
                                handleChange={this.handleCourseChange}
                                options = {this.state.courseslabels}
                            />
                        </Col>
                    </Row>
                </div>

                <div className="mt-4" style={{ display: this.state.showspecificcoursetable ? "block" : "none" }}>
                    <TableHeader
                        header={this.state.specificcoursecollegesheader} 
                        data = {this.state.specificcoursecolleges}
                        dataname = "College"
                    />  
                </div>
            </div>
        )
    }
}
