
//Function
  function globalFunc(doInner1)
  {
    function inner1()
    {
      alert( 'Called Inner Function Function using interface' );
    }

    function inner2()
    {
      alert( 'Called Non_Exported Inner Function' );
    }

    window.newfunc = inner2;
    if ( doInner1 ) inner1();
  }

  function testFunctionInner() {
    globalFunc(true);
  }

  function badCall() {
    try {
      inner1();
    }
    catch(err) {
      alert( 'Error: ' + err);
    }
  }


// Object
  var testObj = function() {

    var outerObjFunction = function() {
      var pi = {};

      pi.inner = function innerObjFunction() {
        alert("Called Inner Object Function using interface");
      }

      return pi;
    };
    return outerObjFunction();
  };

  function testObjectInner() {
    var tester = testObj();

    tester.inner();
  }

// Prototype
  var whatever = new TimeZoneDB();

  TimeZoneDB.prototype.myOwnFunction = function(stuff) {
    alert("Called TimeZoneDB.myOwnFunction() with: " + stuff);
  };

  function showPrototype(stuff) {
    whatever.myOwnFunction(stuff.val());
  }

//Exceptions
  function fireException() {
    try {
      throw "This is a thrown error.";
    }
    catch(err) {
      alert('Caught Error thrown: ' + err);
    }
  }
