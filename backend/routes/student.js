const router = require('express').Router();
const faker = require('faker');

let Student = require('../models/student.model');
let College = require('../models/college.model');
const { route } = require('./college');

function createstudentdata(){
    var skillsdata =['C++', 'Java', 'C', 'Python', 'Machine Learning', 'AI', 'Data Science']
    var sum =0;
    College.find()
    .then(Colleges => {
        for(var j= 0;j<Colleges.length;j++){
            var college_id = Colleges[j]._id;
            var total_students = Colleges[j].no_of_students;
            sum = sum + total_students;
            for(var k = 0;k<total_students;k++){
                var name = "student-"+k;
                var batchyear = Math.floor(Math.random() * 4) + 2017;
                var skills = []
                for(var i = 0;i<skillsdata.length;i++){
                    var flag = faker.random.number({
                            'min': 0,
                            'max': 1
                        });
                    if(flag==1) skills.push(skillsdata[i]);
                }
                // const newstudent = new Student({
                //                                 name: name,
                //                                 batchyear: batchyear,
                //                                 collegeid: college_id,
                //                                 skills: skills            
                //                             })
                // newstudent.save()
                //     .then(() => console.log("Added student"))
                //     .catch(err => res.status(400).json('Error: ' + err));
            }
        }
        console.log(sum);
    })
    .catch(err => res.status(400).json('Error: ' + err));
}

router.route('/').get((req, res) => {
  Student.find()
    .then(Students => res.json(Students))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/upload').get((req, res) => {
    createstudentdata();
    res.json("Student data Uploaded")
});

router.route('/delete').get((req, res) => {
  Student.remove({}).exec();
  res.json("Deleted");
})

router.route('/specific-college/:id').get((req,res) => {
    Student.find({"collegeid": req.params.id})
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/specific-student/:id').get((req,res) => {
    Student.find({"_id": req.params.id})
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;