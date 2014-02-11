
var currentIndex = 0;

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
  loadAllValues(parseInt(length));
//  setupAllBlur();
});

function loadAllValues(size) {
  for (var i=0; i < size; i++) {
    loadValue(NAME, "name" + i);
    loadValue(LIFESPAN, "dates" + i);
    loadValue(GENDER, "gender" + i);
    loadValue(GENDERTYPE, "genderValue" + i);
    loadValue(PHOTOTYPE, "type" + i);
    loadValue(PHOTOTYPEVALUE, "typeValue" + i);
    loadValue(NOTES, "notes" + i);
  }
}

function loadValue(type, id) {
  var edit = document.getElementById(id);
  if (edit) {
    if (localStorage.getItem(id)) {
      edit.innerHTML = localStorage.getItem(id);
    }
  }
}

function editPhoto(index) {
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

function populateDialog(index) {
  var name = document.getElementById("name" + index);
  $("#nameInput").val(name.innerHTML);

  var lifespan = document.getElementById("dates" + index);
  $("#datesInput").val(lifespan.innerHTML);

  var gender = document.getElementById("genderValue" + index).innerHTML;
  if (gender == "M") {
    $("input[name=male]").attr('checked', true);
  }
  else if (gender == "F") {
    $("input[name=female]").attr('checked', true);
  }
  else {
    $("input[name=male]").attr('checked', false);
    $("input[name=male]").attr('checked', false);
  }

  var type = document.getElementById("typeValue" + index);
  $("#photoType").val(type.innerHTML);

  var notes = document.getElementById("notes" + index);
  $("#noteInput").val(notes.innerHTML);

  $("#nameInput").focus();
}

function saveChanges(type, id) {
  var value = document.getElementById(id).innerHTML;
  personInfo.setValue(currentIndex, type, value);
  localStorage.setItem(id, value);
}

function saveDialog(hideDialog) {
  if (hideDialog) {
    $("#dialog").addClass("hide");
    $("#dialog").removeClass("infoForm");
  }
  var index = currentIndex;

  var nameInput = $("#nameInput").val();
  document.getElementById("name" + index).innerHTML = nameInput;
  saveChanges(NAME, "name" + index);

  var datesInput = $("#datesInput").val();
  document.getElementById("dates" + index).innerHTML = datesInput;
  saveChanges(LIFESPAN, "dates" + index);

  var genderInput = $('input:radio[name=gender]:checked').val();
  if (genderInput == "male") {
    document.getElementById("gender" + index).innerHTML = document.getElementById("maleLabel").innerHTML;
    document.getElementById("genderValue" + index).innerHTML = "M";
  }
  else if (genderInput == "female") {
    document.getElementById("gender" + index).innerHTML = document.getElementById("femaleLabel").innerHTML;
    document.getElementById("genderValue" + index).innerHTML = "F";
  }
  saveChanges(GENDER, "gender" + index);
  saveChanges(GENDERTYPE, "genderValue" + index);

  var typeInput = $("#photoType").val();
  document.getElementById("typeValue" + index).innerHTML = typeInput;
  document.getElementById("type" + index).innerHTML = document.getElementById(typeInput + "Label").innerHTML;
  saveChanges(PHOTOTYPE, "type" + index);
  saveChanges(PHOTOTYPEVALUE, "typeValue" + index);

  var notesInput = $("#noteInput").val();
  document.getElementById("notes" + index).innerHTML = notesInput;
  saveChanges(NOTES, "notes" + index);



    // Testing
  if (hideDialog) {
    personInfo.showPERSON(index);
  }
}

function cancelDialog() {
  $("#dialog").addClass("hide");
  $("#dialog").removeClass("infoForm");
}