module.exports = function(app) {
  app.get('/:page', function(req, res){
    res.render(req.params.page, {});
  });
  app.get('/', function(req, res){
    res.render("index", {});
  });
  app.get('/testapp', function(req, res){
    res.render("testapp", {});
  });
  app.get('/index2', function(req, res){
    res.render("index2", {});
  });
  app.get('/app', function(req, res){
    res.render("app", {});
  });
  app.get('/:page', function(req, res){
    res.render("testapp", {});
  });
}