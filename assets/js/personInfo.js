
var NAME = 0;
var LIFESPAN = 1;
var GENDER = 2;
var GENDERTYPE = 3;
var PHOTOTYPE = 4;
var PHOTOTYPEVALUE = 5;
var NOTES = 6;


var personInfo = (function () {

  var  person = {};

  var name = new Array();
  var lifeSpan = new Array();
  var gender = new Array();
  var genderType = new Array();
  var photoType = new Array();
  var photoTypeValue = new Array();
  var notes = new Array();

  person.setName = function (index, newName) {
    name[index] = newName;
  };

  person.getName = function(index) {
    return name[index];
  };

  person.setLifeSpan = function (index, newSpan) {
    lifeSpan[index] = newSpan;
  };

  person.getLifeSpan = function(index) {
    return lifeSpan[index];
  };

  person.setGender = function (index, newGender) {
    gender[index] = newGender;
  };

  person.getGender = function(index) {
    return gender[index];
  };

  person.setGenderType = function (index, newGenderType) {
    genderType[index] = newGenderType;
  };

  person.getGenderType = function(index) {
    return genderType[index];
  };

  person.setPhotoType = function (index, newType) {
    photoType[index] = newType;
  };

  person.getPhotoType = function(index) {
    return photoType[index];
  };

  person.setPhotoTypeValue = function (index, newTypeValue) {
    photoTypeValue[index] = newTypeValue;
  };

  person.getPhotoTypeValue = function(index) {
    return photoTypeValue[index];
  };

  person.setNotes = function (index, newNotes) {
    notes[index] = newNotes;
  };

  person.getNotes = function(index) {
    return notes[index];
  };

  person.setValue = function(index, type, value) {
    switch (type)
    {
      case NAME:
        person.setName(index, value);
        break;
      case LIFESPAN:
        person.setLifeSpan(index, value);
        break;
      case GENDER:
        person.setGender(index, value);
        break;
      case GENDERTYPE:
        person.setGenderType(index, value);
        break;
      case PHOTOTYPE:
        person.setPhotoType(index, value);
        break;
      case PHOTOTYPEVALUE:
        person.setPhotoTypeValue(index, value);
        break;
      case NOTES:
        person.setNotes(index, value);
        break;
      default:
        break;
    }
  };

  person.persist = function() {
    var data = {};
    data.name = name;
    data.lifeSpan = lifeSpan;
    data.gender = gender;
    data.genderType = genderType;
    data.photoType = photoType;
    data.photoTypeValue = photoTypeValue;
    data.notes = notes;

    var output = JSON.stringify(data);

    $.ajax({
        type: "POST",
        url: "/family/save",
        // The key needs to match your method's input parameter (case-sensitive).
        data: output,
//        data: JSON.stringify({ Persons: data }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){alert(data);},
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
  };



  //Testing
  person.showPERSON = function (index) {
    var stuff = "saved to object: ";
    for (var i = 0; i <= index; i++) {
      stuff += i + " " + name[i] + " " + lifeSpan[i] + " " + gender[i] + " " + photoType[i] + " " + notes[i] + "\n";
    }
    alert(stuff);
  };

  return person;
}());
