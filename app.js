// Dependencies

const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks')
const path = require('path')
const routes = require ('./routes/wiki')
const models = require('./models')
const app = express();

// Views
var env = nunjucks.configure('views', { noCache: true })
app.set('view engine', 'html')
app.engine('html', nunjucks.render)

// Controller
app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/wiki', routes)



// Routes (Index) //

app.get('/', function(req, res, next){
    res.render('index')
});


// Error Handler //
app.use(function(err, req, res, next){
    console.error(err)
    res.status(500).send(err.message); // 500 Internal Server Error

})


// Models //

var Page = models.Page
var User = models.User

User.sync()
    .then(function(){
        return Page.sync({force: false})
    })
    .then(function(){
        app.listen(3000, function(){
        console.log('Listening on port 3000!')
    });
})
.catch(console.error);