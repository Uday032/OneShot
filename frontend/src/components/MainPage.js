import React, { Component } from 'react'
import {Row, Col, CardColumns} from 'react-bootstrap'
import ReactSelect from './ReactSelect'
import DataDetailList from './DataDetailsList'
import SimilarCollegesCard from './SimilarCollegesCard'

//axios
import instance from '../axios'

export default class MainPage extends Component {
    constructor(){
        super();

        this.handleCollegeChange = this.handleCollegeChange.bind(this);
        this.handleStudentChange = this.handleStudentChange.bind(this);

        this.state = {
            selectedcollege: '',
            selectedstudent: '',
            showstudent: 0,
            showcollegedetails: 0,
            showstudentdetails: 0,
            collegecountry: '',
            collegecity: '',
            collegename: '',
            collegenoofstudents: '',
            collegestate: '',
            collegeyearfounded: '',
            studentname: '',
            studentbatchyear: '',
            studentskills: [],
            coursesoffered: [],
            studentoptions: [],
            collegeoptions: [],
            similarcolleges: [],
            showsimilarcolleges: 0
        }
    }

    componentDidMount() {
        instance.get('/college')
        .then((res)=>{
            if(res.data.length>0){
                this.setState({
                    collegeoptions: res.data.map(function(college){
                        return {
                            value: college._id,
                            label: college.name
                        }
                    })
                })
            }
        })
    }

    handleCollegeChange = selectedcollege => {
        this.setState({selectedcollege});
        const fetchcollegedetailsurl = '/college/college-details/'+selectedcollege.value;
        instance.get(fetchcollegedetailsurl)
            .then((response)=>{
                if(response.data.length>0){
                    console.log(response.data[0]);
                    this.setState({
                        collegecity: response.data[0].city,
                        collegecountry: response.data[0].country,
                        collegename: response.data[0].name,
                        collegeyearfounded: response.data[0].yearfounded,
                        collegestate: response.data[0].state,
                        collegenoofstudents: response.data[0].no_of_students,
                        coursesoffered: response.data[0].courses,
                        showcollegedetails: 1,
                        showsimilarcolleges: 1
                    })
                }
            })

        let studenturl = '/student/specific-college/'+selectedcollege.value;
        instance.get(studenturl)
            .then((res)=>{
                if(res.data.length>0){
                    this.setState({
                        studentoptions: res.data.map(function(student){
                            return {
                                value: student._id,
                                label: student.name
                            }
                        }),
                        showstudent: 1,
                        showstudentdetails: 0,
                        selectedstudent: ''
                    })
                }
            })

        let similarcollegeurl = '/college/similarcolleges/'+selectedcollege.value;
        instance.get(similarcollegeurl)
            .then((res) => {
                this.setState({
                    similarcolleges: res.data
                })
            })
    }

    handleStudentChange = selectedstudent => {
        this.setState({selectedstudent});
        let studentdataurl = '/student/specific-student/'+selectedstudent.value;
        instance.get(studentdataurl)
            .then((res)=>{
                if(res.data.length>0){
                    this.setState({
                        studentskills: res.data[0].skills,
                        studentname: res.data[0].name,
                        studentbatchyear: res.data[0].batchyear,
                        showstudentdetails: 1
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
                        <div className="mb-4" style={{ display: this.state.showstudent ? "block" : "none" }}>
                            <p>Select Student: </p>
                            <ReactSelect
                                selectedOption = {this.state.selectedstudent}
                                handleChange={this.handleStudentChange}
                                options = {this.state.studentoptions}
                            />
                        </div>
                    </Col>
                    <Col md="8">
                        <div className="ml-3 mt-3" style={{ display: this.state.showcollegedetails ? "block" : "none" }}>
                            <div>
                                <h5>College Details: </h5>
                                <br />
                                <ul>
                                    <DataDetailList label="Name" value={this.state.collegename} />
                                    <DataDetailList label="Year Founded" value={this.state.collegeyearfounded} />
                                    <DataDetailList label="No. of Students" value={this.state.collegenoofstudents} />
                                    <DataDetailList label="Location" value={this.state.collegecity+", "+ this.state.collegestate+", "+ this.state.collegecountry} />
                                    <DataDetailList label="Courses Provided" value={this.state.coursesoffered} />
                                </ul>
                            </div>
                        </div>

                        <div className="ml-3 mt-3" style={{ display: this.state.showstudentdetails ? "block" : "none" }}>
                            <div>
                                <h5>Student Details: </h5>
                                <br />
                                <ul>
                                    <DataDetailList label="Name" value={this.state.studentname} />
                                    <DataDetailList label="Batch Year" value={this.state.studentbatchyear} />
                                    <DataDetailList label="Skills" value={this.state.studentskills} />
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
                
                <div className="mt-4" style={{ display: this.state.showsimilarcolleges ? "block" : "none" }}>
                    <h5>Similar Colleges</h5>
                    <CardColumns>
                        {this.state.similarcolleges.map((similar) => {
                            return(
                                <SimilarCollegesCard 
                                    collegename = {similar.name}
                                    collegenoofstudents = {similar.no_of_students}
                                    collegecity = {similar.city}
                                    collegestate = {similar.state}
                                    collegecountry = {similar.country}
                                    coursesoffered = {similar.courses}
                                    collegeyearfounded = {similar.yearfounded}
                                />
                            );
                        })}
                    </CardColumns>

                    
                </div>
            </div>
        )
    }
}
