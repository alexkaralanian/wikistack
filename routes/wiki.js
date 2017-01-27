// ROUTER

const express = require('express');
const router = express.Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;

// GET /wiki
router.get('/', function(req,res,next){

    Page.findAll({})
    .then(function(pages){
      res.render('index', {
        pages: pages
      });
    })
    .catch(next)
})

// POST /wiki
router.post('/', function(req, res, next) {

  console.log(req.body) // JSON object

  var page = Page.build({ // Here we are buildng a representation of the page, which has not been laoded into DB yet
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });

  page.save() // this returns a promise. Anytime somethign interacts with the DB and uses something external to the program, it is going to be asynchronous. We use .then() to unpack it.
    .then(function(content){
        console.log('Page saved successfully!')
        res.redirect(page.route)
    })
    .catch(function(err){
      next(err)
    });
});

// GET /wiki/add
router.get('/add', function(req, res, next){
    res.render('addpage')
});

router.get('/:urlTitle', function(req,res,next){

    var title = req.params.urlTitle;

    Page.findOne({
      where:{
        urlTitle: title
      }
    })
      .then(function(page){
        if (page === null){
          return next(new Error('That page was not found'))
        }
        res.render('wikipage', {
          page: page
        })
      })
      .catch(next)
});

module.exports = router;