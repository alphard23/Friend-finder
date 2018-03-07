var path = require('path');

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render("home", {layout: false});
  })

  app.get('/survey', function(req, res) {
    res.render("survey");
  })

  // Todo: find out more about error handling in Express
  app.use(function(req, res, next) {
    res.status(404);
    res.render("errors", 
      {error: "404 - Page not Found!", layout: false});
  })   

  app.use(function(req, res, next) {
    res.status(403);
    res.render("errors", 
      {error: "403 - Forbidden", layout: false});
  })   

  app.use(function(req, res, next) {
    res.status(500);
    res.render("errors", 
      {error: "500 - Internal Server Error", layout: false});
  }) 

}
