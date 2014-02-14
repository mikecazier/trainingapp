module.exports = function(app) {

  /* Endpoints to bring up pages. */

  app.get('/family', function(req, res){
    var stones = setupStones();
    var photos = setupPhotos();
    res.render("family", {
      stoneList: stones,
      photoList: photos,
      params: {page: "graves", showPhotos: true}//experiment.variantFor("showPhotos", context)}
    });
  });

  app.get('/family/graves', function(req, res){
    var stones = setupStones();
    var photos = setupPhotos();
    res.render("family", {
      stoneList: stones,
      photoList: photos,
      params: {page: "graves", showPhotos: true}// experiment.variantFor("showPhotos", context)}
    });
  });

//  if (experiment.variantFor("showPhotos", context)) {
    app.get('/family/photos', function(req, res){
      var stones = setupStones();
      var photos = setupPhotos();
      res.render("family", {
        stoneList: stones,
        photoList: photos,
        params: {page: "photos", showPhotos: true}
      });
    });
//  }

  app.get('/family/parallel', function(req, res){
    var stones = setupStones();
    var photos = setupPhotos();
    res.render("family", {
      stoneList: stones,
      photoList: photos,
      params: {page: "parallel", showPhotos: true}
    });
  });

  app.get('/family/time', function(req, res){
    var stones = setupStones();
    var photos = setupPhotos();
    res.render("family", {
      stoneList: stones,
      photoList: photos,
      params: {page: "time", showPhotos: true}
    });
  });

  /* Endpoints to send and retrieve info from the "server" */
  app.get('/family/save', function(req, res){
    console.out("Endpoint Called: " + req)
  });




  function setupStones() {
    var stones = new Array();
    stones[0] = "MarkerAlexanderCazier.JPG";
    stones[1] = "MarkerBenjaminCazierSr.JPG";
    stones[2] = "MarkerFrederickAlvinCazier.JPG";
    stones[3] = "MarkerHelenCazierNorton.JPG";
    stones[4] = "MarkerHubertBCazier.JPG";
    return stones;
  }

  function setupPhotos() {
    var photos = new Array();
    photos[0] = "CharlesDrakeCazier.JPG";
    photos[1] = "BenjaminCazierSr.JPG";
    photos[2] = "DanielMarkBurbank.JPG";
    photos[3] = "ElizabethCazier.JPG";
    photos[4] = "SamuelCazier.JPG";
    return photos;
  }
}