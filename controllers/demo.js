module.exports = function (app) {
  var http = require('http');

  function getTreePersonName(req, personId, callback) {
    var personName;
    var nameRequestUrl = "localhost:5000/name?id=" + personId;
    req.superagent
      .get(nameRequestUrl)
      .end(function (err, response) {
        console.log('Results', response.res.client);
//        console.log('Results', response.res.domain.members[0].client);

//        if (err) return callback(err);
//        if (!response.ok) return callback(new Error(response.text));

//        var conclusions = response.body.conclusions.list;
//        for (var i = 0; i < conclusions.length; i++) {
//          if (conclusions[i].nameConclusion) {
//            personName = conclusions[i].nameConclusion.primaryForm.fullText;
//            break;
//          }
//        }
        callback(null, response);
      });
  }





  function getTime(req, location, callback) {
    req.superagent
      .get("http://api.timezonedb.com/?zone=" + location + "&key=S9NEWJN3XU96")
//      .get("http://api.timezonedb.com/?zone=America/Denver&key=S9NEWJN3XU96")
      .set('Accept', 'application/json')
      .end(function (err, response)
      {

        var options = {
          host : 'api.timezonedb.com',
          path : '?zone=' + location + '&key=S9NEWJN3XU96',
          port : 8000,
          method : 'GET'
        };

        var request = http.request(options, function(response) {
           response.on('data', function(data) {
             callback(null, data);
           });
         });

         request.end();
    })
  }

  function fullParallel(callbacks, last) {
    var results = [];
    var result_count = 0;
    callbacks.forEach(function(callback, index) {
      callback( function() {
        results[index] = Array.prototype.slice.call(arguments);
        result_count++;
        if(result_count == callbacks.length) {
          last(results);
        }
      });
    });
  }

//  http://api.timezonedb.com/?zone=America/Denver&key=S9NEWJN3XU96



  app.get('/demos', function (req, res) {

    fullParallel([
//      function (next) {
//        getTime(req, "America/Denver", next)
//      },
//      function (next) {
//        getTime(req, "America/Chicago", next)
//      },
//      function (next) {
//        getTime(req, "America/Los_Angeles", next)
//      } //,
      function(next) { getTreePersonName(req, "KW31-4P2", next); },
      function(next) { getTreePersonName(req, "KWCP-JCL", next); },
      function(next) { getTreePersonName(req, "KWCP-JCX", next); }
    ], function (res) {

      console.log('Results', res);

//      res.render("demos", {
//
//
//
//      });
    });
  });

//  app.get('/name', function (req, res) {
//    if (req.param('id') == "KW31-4P2") {
//      console.log('Called', "Frank Burns");
//      res.write("Frank Burns");
//      res.text = "Frank Burns";
//
//    }
//    else if (req.param('id') == "KWCP-JCL") {
//      console.log('Called', "Isaac Briggs");
//      res.write("Isaac Briggs");
//      res.text = "Isaac Briggs";
//    }
//    else if (req.param('id') == "KWCP-JCX") {
//      console.log('Called', "Gerald Todd");
//      res.write("Gerald Todd");
//      res.text = "Gerald Todd";
//    }
//    res.end();
//  });


  app.get('/hello', function (req, res) {

    res.render("demos", {



    });


  });




};