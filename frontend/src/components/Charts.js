import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import {Pie} from 'react-chartjs-2';
//AXIOS
import instance from '../axios'


export default class Charts extends Component {
    constructor(){
        super();

        this.handleChartGenerator = this.handleChartGenerator.bind(this);
        this.state = {
            collegecoursesdata: [],
            courseslabels: [],
            showchart: Boolean(false),
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
                    showchart: Boolean(true)
                })
                console.log(this.state.courseschartdata);
            })

    }

    render() {
        return (
            <div className="mt-5">
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
                <div>
                    
                </div>
            </div>
        )
    }
}
