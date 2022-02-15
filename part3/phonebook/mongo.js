const mongoose = require('mongoose')

const displayErrorMessage = () => {
    console.log('Please use one of the following formats:')
    console.log('   1) "node mongo.js <password>" to view all database entries')
    console.log('   2) "node mongo.js <password> <name> <number>" to add a new entry to the database')
}

if (process.argv.length < 3 || process.argv.length > 5) {
    displayErrorMessage()
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fso_user:${password}@cluster0.ychxk.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('phonebook:')

    Person
        .find({})
        .then(people => {
            people.forEach(person => {
                console.log(`   ${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
}

if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person
        .save()
        .then(result => {
            console.log(`added ${result.name} with number ${result.number} to the phonebook`)
            mongoose.connection.close()
        })
}

if (process.argv.length === 4) {
    displayErrorMessage()
    mongoose.connection.close()
    process.exit(1)
}