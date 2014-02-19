
var currentIndex = 0;
var invalidForm = false;

function locate(name) {
  window.alert(name);
}

(function($) {
    $.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'fast');
        return this; // for chaining...
    }
})(jQuery);

//function showGraveStonePage() {
//  $("#stoneBox").addClass("photoBox clearfix").removeClass("hide");
//  $("#photoBox").addClass("hide").removeClass("photoBox clearfix");
//  $("#gravesLink").addClass("selected");
//  $("#photosLink").removeClass("selected");
//}
function showGraveStonePage() {
  window.location.href = "http://localhost:5000/family/graves"
}

function showPhotographsPage() {
  window.location.href = "http://localhost:5000/family/photos"
}

function showTimePage() {
  window.location.href = "http://localhost:5000/family/time"
}

function showParallelsPage() {
  window.location.href = "http://localhost:5000/family/parallel"
}

$(function() {
  var length = document.getElementById("stoneCount").innerHTML
             + document.getElementById("photoCount").innerHTML;
  formData.clearFormData();
  loadAllValues(parseInt(length));
//  setupAllBlur();
});

function loadAllValues(size) {
  for (var i=0; i < size; i++) {
    loadValue(NAME, i, "name" + i);
    loadValue(LIFESPAN, i, "dates" + i);
    loadValue(GENDER, i, "gender" + i);
    loadValue(GENDERTYPE, i, "genderValue" + i);
    loadValue(PHOTOTYPE, i, "type" + i);
    loadValue(PHOTOTYPEVALUE, i, "typeValue" + i);
    loadValue(NOTES, i, "notes" + i);
  }
}

function loadValue(type, index, id) {
  var edit = document.getElementById(id);
  if (edit) {
    if (localStorage.getItem(id)) {
      edit.innerHTML = localStorage.getItem(id);
      personInfo.setValue(index, type, localStorage.getItem(id));
    }
  }
}

function editPhoto(index) {
  if (!invalidForm) {
    $("#errorBox").hide();
    formData.clearFormData();
    $("#dialog").addClass("hide");
    $("#dialog").removeClass("infoForm");
    currentIndex = index;
    var element = document.getElementById("photo" + index);
    if ($(window).width() > 767) {
      x=$('#photo'+index).offset().left + $('#photo'+index).outerWidth(true) + 10;
      y=$("#photo" + index).offset().top;
    }
    else {
      x=$('#photo'+index).offset().left;
      y=$('#photo'+index).offset().top + $('#photo'+index).outerHeight(true);
    }
    $("#dialog").css({left:x, top:y});
    $("#dialog").removeClass("hide");
    $("#dialog").addClass("infoForm");
    populateDialog(index);
  }
}

function populateDialog(index) {
  formData.putFormData(index);
  $("#nameInput").focus();
}

function saveChanges(type, id, value) {
//  var value = document.getElementById(id).innerHTML;
  personInfo.setValue(currentIndex, type, value);
  localStorage.setItem(id, value);
}

function saveDialog(hideDialog) {

  formData.getFormData();

  validateForm();

  if (hideDialog) {
    $("#dialog").addClass("hide");
    $("#dialog").removeClass("infoForm");
  }
  var index = currentIndex;

  document.getElementById("name" + index).innerHTML = formData.fullName;
  saveChanges(NAME, "name" + index, formData.fullName);

  document.getElementById("dates" + index).innerHTML = formData.lifeSpan;
  saveChanges(LIFESPAN, "dates" + index, formData.lifeSpan);

  if (formData.genderValue == "M") {
    document.getElementById("gender" + index).innerHTML = document.getElementById("maleLabel").innerHTML;
    document.getElementById("genderValue" + index).innerHTML = "M";
  }
  else if (formData.genderValue == "F") {
    document.getElementById("gender" + index).innerHTML = document.getElementById("femaleLabel").innerHTML;
    document.getElementById("genderValue" + index).innerHTML = "F";
  }
  saveChanges(GENDER, "gender" + index, formData.gender);
  saveChanges(GENDERTYPE, "genderValue" + index, formData.genderValue);

  document.getElementById("typeValue" + index).innerHTML = formData.photoTypeValue;
  document.getElementById("type" + index).innerHTML = document.getElementById(formData.photoType + "Label").innerHTML;
  saveChanges(PHOTOTYPE, "type" + index, formData.photoType);
  saveChanges(PHOTOTYPEVALUE, "typeValue" + index, formData.photoTypeValue);

  document.getElementById("notes" + index).innerHTML = formData.notes;
  saveChanges(NOTES, "notes" + index, formData.notes);

    // Testing
  if (hideDialog) {
    personInfo.showPERSON(index);
  }
}

function saveButton() {
  if (!invalidForm) {
    $("#dialog").addClass("hide");
    $("#dialog").removeClass("infoForm");
  }
}

// Validation functions
function validName(nameValue) {
  if (nameValue.length == 0) {
    return true;
  }
  var myRe = /[^\w\s]/;
  return !myRe.test(nameValue);
}

function validDate(dateValue) {
  if (dateValue.length == 0) {
    return true;
  }
  var myRe = /[^\d\s-]/;
  return !myRe.test(dateValue);
}

function validNote(noteValue) {
  if (noteValue.length == 0) {
    return true;
  }
  var myRe = /[^\w\s,.!?]/;
  return !myRe.test(noteValue);
}

function validateForm() {
  $("#errorBox").addClass("hide");
  invalidForm = false;
  $("#nameInput").removeClass("errorField");
  $("#datesInput").removeClass("errorField");
  $("#notesInput").removeClass("errorField");

  if (!validName(formData.fullName)) {
    $("#errorBox").removeClass("hide");
    invalidForm = true;
    $("#nameInput").addClass("errorField");
  }
  if (!validDate(formData.lifeSpan)) {
    $("#errorBox").removeClass("hide");
    invalidForm = true;
    $("#datesInput").addClass("errorField");
  }
  if (!validNote(formData.notes)) {
    $("#errorBox").removeClass("hide");
    invalidForm = true;
    $("#notesInput").addClass("errorField");
  }
}