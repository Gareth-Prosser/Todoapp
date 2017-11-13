var express =  require('express');
var todoController = require('./controllers/todoController');

var app = express();

// setup tempalte engine.

app.set('view engine', 'ejs');

// Static files

app.use(express.static('public'));
//app.use('/assets' , express.static('assets'));
// fire controllers
todoController(app);

//Listen to port
app.listen(3000);
console.log('Listening on 3000');
