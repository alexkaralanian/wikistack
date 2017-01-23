const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');
const routes = require ('./routes')
const nunjucks = require('nunjucks')

const logger = morgan('dev')
app.use(logger)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.engine('html', nunjucks.render)
app.set('view engine', 'html')

nunjucks.configure('views', { noCache: true })

nunjucks.render('index.html', function(err, res){
})

app.use(routes)

app.listen(3000, function(){
    console.log('Listening on port 3000')
});
