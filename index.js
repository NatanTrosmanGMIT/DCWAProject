var express = require('express')
var lecturersFile = require('./static/lecturersFile')
const { lecturers } = require('./static/lecturersFile')
var listLecturers = require('./listLecturers')
var listModules = require('./listModules')
var bodyParser = require('body-parser')

var app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))

//display students in a module
app.get('/module/students/:mid', (req, res) => {
    listModules.getStudentsInModule(req.params.mid)
        .then((result) => {
            console.log(result)
            res.render('displayStudentsInModule', { students: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

// delete student
app.get('/module/students/delete/:sid', (req, res) => {
    listModules.deleteStudent(req.params.sid)
        .then((result) => {
            if (result.affectedRows == 0) {
                res.send("<h3>Student: " + req.params.sid + " is studying a module and cannot be deleted</h3>" + "<a href='/'>Home</a>")
            } else {
                res.send("<h3>Student: " + req.params.sid + " deleted</h3>" + "<a href='/'>Home</a>")
            }
        })
        .catch((error) => {
            if (error.code == "ER_ROW_IS_REFERENCED_2") {
                res.send("<h3>ERROR: " + error.errno + " cannot delete student with ID: " + req.params.sid + " as theyre enrolled in modules</h3>" + "<a href='/'>Home</a>")
            } else {
                console.log(error.code)
                res.send("<h3>ERROR: " + error.errno + " " + error.sqlMessage + "</h3>" + "<a href='/'>Home</a>")

            }
        })
})

//add lecturer
app.get('/addLecturer', (req, res) => {
    res.render('addLecturer')
})

//add Student
app.get('/addStudent', (req, res) => {
    res.render('addStudent')
})

app.get('/updateModule/:mid', (req, res) => {
    listModules.updateModule(req.params.mid)
        .then((result) => {
            res.render('updateModule', { editModule: result })
        })
        .catch((error) => {
            console.log(error)
        })
})
// edits a module
app.post('/updateModule/:mid', (req, res) => {
    listModules.editModule(req.body.name, req.body.credits, req.body.mid)
        .then((result) => {
            res.render('updateModule', { editModule: result })
        })
        .catch((error) => {
            res.send(error.message)
        })
})
// displays all the lecturers
app.get('/listLecturers', (req, res) => {
    listLecturers.getLecturers()
        .then((result) => {
            console.log(result)
            res.render('displayListLecturers', { lecturer: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

// displays all the students
app.get('/module/students', (req, res) => {
    listModules.getStudents()
        .then((result) => {
            console.log(result)
            res.render('displayListStudents', { students: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

// displays all the modules
app.get('/listModules', (req, res) => {
    listModules.getModules()
        .then((result) => {
            console.log(result)
            res.render('displayListModules', { modules: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

// redirects to home page
app.get('/', (req, res) => {
    console.log("OK")
    res.sendFile(__dirname + "/homepage.html");
})

// displays lecturers database
app.get('/lecturers', (req, res) => {
    res.send(lecturersFile.lecturers)
})

// find by lecturers id, error if not found
app.get('/lecturers/:id', (req, res) => {
    console.log(req.params.id)

    //res.send(req.params.id)

    var e = lecturers.find((lecturer) => {
        if (lecturer.id == req.params.id) {
            return lecturer
        }
    })
    if (e != undefined) {
        res.send(e)
    } else {
        res.send("<h1>Error: Lecturers" + req.params.id + " not found </h1>")
    }
})

app.listen(3000, () => {
    console.log("Roger, Listening in Port 3000")
})