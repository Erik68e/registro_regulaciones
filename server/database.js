const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost/Examen';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB', error));

module.exports = mongoose;