const mongoose = require ('mongoose');
const uri = 'mongodb://localhost/mern-tasks';

mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true})
    .then(db => {
        console.log("db works");
    })
    .catch(err => {
        console.log(err);
    })

module.exports = mongoose;