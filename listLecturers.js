const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'lecturersDB';
const colName = 'lecturers';

var lecturersDB
var lecturers

MongoClient.connect(url, { useNewURLParser: true, useUnifiedTopology: true })
    .then((client) => {
        lecturersDB = client.db(dbName)
        lecturers = lecturersDB.collection(colName)
    })
    .catch((error) => {
        console.log(error)
    })

var getLecturers = function () {
    return new Promise((resolve, reject) => {
        var cursor = lecturers.find()
        cursor.toArray()
            .then((documents) => {
                resolve(documents)
            })
            .catch((error) => {
                console.log(error)
            })
    })
}

var addLecturer = function (_id, name, salary, title) {
    return new Promise((resolve, reject) => {
        lecturers.insertOne({ "_id": _id, "name": name, "dept": dept })
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

module.exports = { getLecturers, addLecturer }
