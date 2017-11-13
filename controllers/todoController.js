var bodyParser = require ('body-parser');
var mongoose = require('mongoose'); //Module for connecting to mongo data base

// Connect to the database
mongoose.connect('mongodb://gareth:test@ds251435.mlab.com:51435/garethtodo');  //mlab is the provider of the free DB for this testing. PW : Trees123!
console.log('Successful connection to DB');

// Create Schema - Blue print for the data type so that Mongo knows how the object is formated
var todoSchema = new mongoose.Schema({
     item: String
 });

var Todo = mongoose.model('Todo', todoSchema);  // New modle based on the todoScheam delaired above.
//var data =[{item:'do work'}, {item:'more work'}, {item:'even more work to do'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){

app.get('/todo', function(req, res){
  // Get data from Mongo DB and display it.
Todo.find({},function(err, data){
    if (err) throw err;
    res.render('todo', {todos: data});
    });
});

app.post('/todo',urlencodedParser, function(req, res){
// Get data from view and write to Mongo DB
var newTodo = Todo(req.body).save(function(err,data){
  if (err) throw err;
  res.json(data);
  console.log('** Successfully added');
  });
});

app.delete('/todo/:item', function(req, res){
// Delete the requested item from mongodb
Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
  if (err) throw err;
  res.json(data);
  console.log('** Successfully removed');
  });
});

}
