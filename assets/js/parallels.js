function showGraveStonePage() {
  window.location.href = "http://localhost:5000/family/graves"
}

function showPhotographsPage() {
  window.location.href = "http://localhost:5000/family/photos"
}

function showDemosPage() {
  window.location.href = "http://localhost:5000/family/demos"
}

function showParallelsPage() {
  window.location.href = "http://localhost:5000/family/parallel"
}

function convertTime(timestamp) {
  var newDate = new Date();
  newDate.setTime((timestamp + 21600) *1000);
//  dateString = newDate.toUTCString();
  dateString = newDate.toLocaleString();
  return dateString;
}

function displayZone(zone, callback){
    var tz = new TimeZoneDB;
    tz.getJSON({
        key: "S9NEWJN3XU96",
        zone: zone
    }, function(data){
        callback(null, data);
    });
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

function getAllTimes() {
    fullParallel([
      function(next) { displayZone("America/Denver", next) },
      function(next) { displayZone("America/Chicago", next) },
      function(next) { displayZone("America/Los_Angeles", next) },
      function(next) { displayZone("America/New_York", next) }
    ], function(res) {
      var time1 = document.getElementById("denver");
      time1.innerHTML = convertTime(res[0][1].timestamp);
      var time2 = document.getElementById("chicago");
      time2.innerHTML = convertTime(res[1][1].timestamp);
      var time3 = document.getElementById("los_angeles");
      time3.innerHTML = convertTime(res[2][1].timestamp);
      var time4 = document.getElementById("new_york");
      time4.innerHTML = convertTime(res[3][1].timestamp);
 })
}