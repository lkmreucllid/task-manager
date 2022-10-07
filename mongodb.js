//CRUD Create Read Update Delete
/*
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
*/

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017/test'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        //  console.log(error)
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
        // Insert Single Document into collection
        /*
            db.collection('users').insertOne({
                name: 'Sandy',
                age: 27
            }, (error, result) => {
                if (error) {
                    return console.log('Unable to insert user')
                }
                console.log(result.ops)
            })
        */

    // Insert Multiple Documents into collection
    /*
    db.collection('users').insertMany(
        [
            { name: 'Pawan', age: 28 },
            { name: 'Nitin', age: 29 }
        ],
        (error, result) => {
            if (error) {
              return  console.log('Unable to insert documents!')
            }
            console.log(result.ops)
        })
        */

    /*
    db.collection('tasks').insertMany(
        [
            { description: 'Reading', completed: true },
            { description: 'Building MongoDB App', completed: false },
            { description: 'Learning', completed: false }
        ],
        (error, result) => {
            if (error) {
                return console.log('Unable to insert task details!')
            }
            console.log(result.ops)
        }
    )
    */
    //Reading the documents for a specific meatch
    /*
    db.collection('users').findOne({ _id: new ObjectID("6338bb7f2490261570687be6") },
        (error, user) => {
            if (error) {
                return console.log('Unable to fetch user')
            }
            console.log(user)
        })

    db.collection('users').find({ age: 27 }).toArray((error, users) => {
        console.log(users)
    })

    db.collection('tasks').findOne({ _id: new ObjectID("6338b7ca244a3f1a70924094") },
        (error, task) => {
            if (error) {
                return console.log('Not task found!')
            }
            console.log(task)
        })

    db.collection('tasks').find({ completed: true }).toArray(
        (error, tasks) => {
            if (error) {
                return console.log('Not tasks found')
            }
            console.log(tasks)
        })
        */

    //Update the documents
    /*
    db.collection('users').updateOne({
            _id: new ObjectID("6338b409fc289d1a389f4a32")
        }, {
            $set: {
                name: 'Simran'
            }
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })*/
    /*
        db.collection('users').updateOne({
            _id: new ObjectID("6338b409fc289d1a389f4a32")
        }, {
            $inc: {
                age: -1
            }
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })*/

    //Update Many
    /*
    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
    */

    //deleteMany
    db.collection('users').deleteMany({
        age: 26
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    //deleteOne
    /*
    db.collection('tasks').deleteOne({
        description: 'Learning'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
    */
})