const router = require('express').Router();
const faker = require('faker');

let College = require('../models/college.model');

function createrandomdata() {
  var coursesdata = ["Computer Science", "Electronics", "IT", "Civil", "Biotechnology", "Mechanical"]
  for(var i =0;i<100;i++){
    var name = "College"+i
    var yearfounded = Math.floor(Math.random() * 97) + 1920;
    var city = faker.address.city();
    var state = faker.address.country();
    var country = faker.address.state();
    var no_of_students = Math.floor(Math.random() * 50) + 50;
    var courses = [];
    for(var j = 0; j<coursesdata.length; j++){
      var flag = faker.random.number({
                      'min': 0,
                      'max': 1
                  });
      // console.log(flag);
      if(flag==1) courses.push(coursesdata[j]);
    }
    // console.log(city, state );
    const newcollege = new College({
                                      name: name,
                                      yearfounded: yearfounded,
                                      city: city,
                                      state: state,
                                      country: country,
                                      no_of_students: no_of_students,
                                      courses: courses
                                  })
    
    newcollege.save()
    .then(() => console.log("Added"+ name))
    .catch(err => res.status(400).json('Error: ' + err));
  }
}


router.route('/').get((req, res) => {
  College.find()
    .then(Colleges => res.json(Colleges))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/upload').get((req, res) => {
  createrandomdata();
  res.json("Uploaded")
})

router.route('/delete').get((req, res) => {
  College.remove({}).exec();
  res.json("Deleted");
})

router.route('/college-details/:id').get((req, res) => {
  College.find({"_id": req.params.id})
        .then(collegedetails => res.json(collegedetails))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/collegedata/chart').get((req, res) => {
  College.find({},{state:1, _id: 0})
    .then(collegesstates => {
      var dict = {};
      var percentvalue = [];
      var label = []
      for(var i =0;i<collegesstates.length;i++) {
        if (!(collegesstates[i].state in dict)) {
          dict[collegesstates[i].state]=0
        }
        dict[collegesstates[i].state]= dict[collegesstates[i].state]+1;
      }
      for(var key in dict) {
        percentvalue.push(dict[key]);
        label.push(key);
      }
      res.json({'label': label, 'percentage': percentvalue})
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/collegedata/chart/:id').get((req, res) => {
  College.find({"state": res.params.id})
    .then(collegesstates => {
      res.json(collegesstates)
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/chart/courses').get((req, res) => {
  College.find({}, {courses:1, _id:0})
    .then((collegecourses) => {
      var dict = {};
      var percentvalue = [];
      var label = []
      for(var i =0;i<collegecourses.length;i++) {
        for(var j = 0;j<collegecourses[i].courses.length;j++){
          console.log(collegecourses[i].courses[j]);
          if (!(collegecourses[i].courses[j] in dict)) {
            dict[collegecourses[i].courses[j]]=0
          }
          dict[collegecourses[i].courses[j]]= dict[collegecourses[i].courses[j]]+1;
        }
      }
      for(var key in dict) {
        percentvalue.push(dict[key]);
        label.push(key);
      }
      res.json({'label': label, 'percentage': percentvalue})
    })
})


module.exports = router;