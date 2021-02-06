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
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;