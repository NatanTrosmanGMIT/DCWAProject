var mysql = require('promise-mysql')
var pool

mysql.createPool({
    connectionLimit: 3,
    host                    : 'localhost',
    user                    : 'root',
    password                : 'password',
    database                : 'collegedb'
        })
        .then((result) => {
        pool = result
        })
        .catch((error) => {
        console.log(error)
        });

        var getModules = function(){
            return new Promise((resolve, reject)=>{
        pool.query('SELECT * from module')
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })

}
var getStudents = function(){
    return new Promise((resolve, reject)=>{
        pool.query("SELECT * from student")
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}
var getModule = function(module_id){
    return new Promise((resolve, reject)=>{
        var myQuery={
            sql:'SELECT * from module where module_id = ?',
            values:[module_id]
        }
        pool.query(myQuery)
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

var getLecturers = function(module_id){
    return new Promise((resolve, reject)=>{
        var myQuery={
            sql:'SELECT * from student',
            values:[module_id]
        }
        pool.query(myQuery)
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}


var getStudentsInModule = function(student_id){
    return new Promise((resolve, reject)=>{
        var myQuery={
            sql:"SELECT s.sid,s.name,s.gpa from student s left join student_module m on s.sid= m.sid where m.mid = ?",
            values:[student_id]
            
        }
        pool.query(myQuery)
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

//addStudent
var addStudent = function(student_id){
    return new Promise((resolve, reject)=>{
        var myQuery={
            sql:"insert into student (sid, name, gpa) value ('?','?','?')",
            values:[student_id, s_name, s_gpa]
        }
        pool(myQuery)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
}

// add the update module here
var updateModule = function(mid){
    return new Promise((resolve, reject)=>{
        var myQuery={
            sql:'SELECT * from module  WHERE mid=?',
            values:[mid]
        }
        pool.query(myQuery)
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}
//  edit modules here
var editModule = function(name,credits,mid){
    return new Promise((resolve, reject)=>{
        var myQuery={
            sql:'UPDATE module SET name = ?,credits = ? WHERE mid=?',
            values:[name,credits,mid]
        }
        pool.query(myQuery)
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}
//for deletion
var deleteStudent = function(student_id){
    return new Promise((resolve, reject)=>{
        var deleteQuery={
            sql:'delete from student where sid = ?',
            values:[student_id]
        }
        pool.query(deleteQuery)
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            reject(error)
        })
    })
}
    module.exports = {getModules,getModule,getStudentsInModule,getStudents,deleteStudent,getLecturers,addStudent,updateModule,editModule}