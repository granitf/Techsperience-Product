const express = require('express');

// init app
const app = express();

// Views location
app.set('views', __dirname + '/views');
 

// Setting template engine
app.set('view engine', 'ejs');

// Serving static files
app.use(express.static(__dirname + '/public'));

// body parser middleware
var bodyParser = require('body-parser');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Setup MongoDB
const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb://localhost:27017/techsperience-project';
const ObjectId = require('mongodb').ObjectId;

// Conneting to MongoDB
MongoClient.connect(mongoURL, function(err, db) {
  if (err) {
    console.log(err);
  } else {
    console.log('Database connected successfully!');
    dokumentet = db.collection('dokumentet');
  }
});

// Uploading images and file
var multer  = require('multer');
var upload = multer({dest:'public/uploads'});



//Routes

app.get('/',function(req , res)
{
    dokumentet.find().toArray(function(err, docs)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("view",{docs: docs});
        }
    });
});

app.get('/documents',function(req , res)
{
    dokumentet.find().toArray(function(err, docs)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("index",{docs: docs});
        }
    });
});


app.post('/documents/add',function(req , res)
{
    dokumentet.insert({author:req.body.author, description: req.body.description,nr:req.body.nr,title:req.body.title,
    location:req.body.location,source:req.body.image},function(err, result){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect("/");
        }
    });
});



app.get('/documents/:id',function(req , res)
{
    var id = ObjectId(req.params.id);

    dokumentet.findOne({_id: id},function(err , doc)
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                   res.render('show',{doc: doc});
            }
        });
});



app.get('/documents/edit/:id',function(req , res)
{
    var id = ObjectId(req.params.id);
    dokumentet.findOne({_id: id},function(err , doc)
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                   res.render('edit',{doc: doc});
            }
        });
    
});


app.post('/documents/update/:id',function(req , res){
var id = ObjectId(req.params.id);
dokumentet.updateOne({_id: id}, {$set: {author:req.body.author,description: req.body.description,nr:req.body.nr,title:req.body.title,
    location:req.body.location,source:req.body.image}},
 function(err, result) {
if(err) {
    console.log(err)
 } else {
    res.redirect('/');
 }
});
});


app.get('/documents/delete/:id', function(req, res){
    var id = ObjectId(req.params.id);
    dokumentet.deleteOne({_id:id}, function(err, result) {
        if(err) {
            console.log(err);
        }else {
            res.redirect("/");
        }
    });
    
});



app.listen(3003, function() {
  console.log("App running at http://localhost:3003");
});


