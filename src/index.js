const server = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = server();
mongoose.connect('mongodb://localhost/mevn-database')
	.then(db => console.log('DB is conenected'))
	.catch(err =>console.error(err));


//Settings
app.set('port', 3000);

//Middleware   (functions to run before to go Routes)
app.use(morgan('dev'));         //for show in console the route require from user Navigator
app.use(server.json());     //for manipulate json data how object

//Routes
app.use('/api/task', require('./routes/task.js'));

//static files
//console.log(__dirname)   //find the path
app.use(server.static(__dirname + '/public'));

//Server listening
app.listen(app.get('port'), ()=>{
    console.log('Server on port ',app.get('port'));
})