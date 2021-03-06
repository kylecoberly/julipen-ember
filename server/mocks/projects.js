/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var projectsRouter = express.Router();
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  var nedb = require('nedb');
  var projectDB = new nedb({ filename: 'projects', autoload: true});

  projectsRouter.get('/', function(req, res) {
    projectDB.find(req.query).exec(function(error, projects) {
      res.send({
        'projects': projects
      });
    });
  });

  projectsRouter.post('/', function(req, res) {
    projectDB.find({}).sort({id : -1}).limit(1).exec(
      function(err, projects) {
        if (projects.length !=0)
          req.body.project.id = projects[0].id + 1;
        else
          req.body.project.id = 1;
        projectDB.insert(req.body.project, function(err, newProject) {
          res. status(201);
          res.send(
            JSON.stringify(
            {
              project : newProject
            }));
        });
      })
  });

  projectsRouter.get('/:id', function(req, res) {
    res.send({
      'projects': {
        id: req.params.id
      }
    });
  });

  projectsRouter.put('/:id', function(req, res) {
    res.send({
      'projects': {
        id: req.params.id
      }
    });
  });

  projectsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/projects', require('body-parser'));
  app.use('/api/projects', projectsRouter);
};
