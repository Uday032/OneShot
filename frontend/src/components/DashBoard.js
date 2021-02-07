import React, { Component } from 'react'
import TableHeader from './TableHeader'
import ReactSelect from './ReactSelect'
import {Row, Col} from 'react-bootstrap'

//axios
import instance from '../axios'

export default class DashBoard extends Component {
    
    constructor(){
        super();

        this.handleCollegeChange = this.handleCollegeChange.bind(this);
        this.state = {
            collegetabledata: [],
            collegeoptions: [{label:"Show Colleges", value: "ShowCollege"}],
            studentoptions: [],
            selectedcollege: '',
            showcollegetable: 1,
            showstudenttable: 0,
            collegeheader: ['Name', 'No. of Students', 'Location', 'Courses Offered','Year Founded'],
            studentheader: ['Name', 'Skills', 'Batch Year']
        }
    }

    handleCollegeChange= selectedcollege => {
        this.setState({selectedcollege});

        if(selectedcollege.value==='showcollege') {
            this.setState({
                showstudenttable: 0,
                showcollegetable: 1
            })
        } else {
            let studenturl = '/student/specific-college/'+selectedcollege.value;
            instance.get(studenturl)
                .then((res)=>{
                    console.log(res);
                    if(res.data.length>0){
                        this.setState({
                            studentoptions: res.data,
                            showstudenttable: 1,
                            showcollegetable: 0
                        })
                    }
                })
        }
    }

    componentDidMount() {
        instance.get('/college/')
            .then((res) => {
                console.log("Dashboard: ", res);
                if(res.data.length>0) {
                    // res.data[res.data.length+1] = {name: 'Show College', _id:"showcollege"}
                    
                    this.setState({
                        collegetabledata: res.data,
                        collegeoptions: res.data.map(function(college){
                            return {
                                value: college._id,
                                label: college.name
                            }
                        })
                    })
                    this.setState({
                        collegeoptions: this.state.collegeoptions.concat({
                            value: "showcollege",
                            label: "Show Colleges"
                        })
                    })
                }
            })
    }

    render() {
        return (
            <div className="mt-5">
                <Row>
                    <Col md="4">
                        <div className="mb-4">
                            <p>Select College: </p>
                            <ReactSelect 
                                selectedOption = {this.state.selectedcollege}
                                handleChange={this.handleCollegeChange}
                                options = {this.state.collegeoptions}
                            />
                        </div>
                    </Col>
                </Row>
                <div style={{ display: this.state.showcollegetable ? "block" : "none" }}>
                    <TableHeader
                        header={this.state.collegeheader} 
                        data = {this.state.collegetabledata}
                        dataname = "College"
                    />  
                </div>
                
                <div style={{ display: this.state.showstudenttable ? "block" : "none" }}>
                    <TableHeader 
                        header={this.state.studentheader} 
                        data = {this.state.studentoptions}
                        dataname = "Student"
                    />  
                </div>
                              
            </div>
        )
    }
}
