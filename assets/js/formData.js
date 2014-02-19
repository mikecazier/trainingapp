
var formData = {

  fullName : {},
  lifeSpan : {},
  gender : {},
  genderValue : {},
  photoType : {},
  photoTypeValue : {},
  notes : {},

  getFormData : function() {
    this.clearFormData();

    this.fullName = $("#nameInput").val();

    this.lifeSpan = $("#datesInput").val();

    var genderInput = $('input:radio[name=gender]:checked').val();
    if (genderInput == "male") {
      this.gender = document.getElementById("maleLabel").innerHTML;
      this.genderValue = "M";
    }
    else if (genderInput == "female") {
      this.gender = document.getElementById("femaleLabel").innerHTML;
      this.genderValue = "F";
    }

    var typeInput = $("#photoType").val();
    this.photoTypeValue = typeInput;
    this.photoType = document.getElementById(typeInput + "Label").innerHTML;

    this.notes = $("#noteInput").val();
  },

  setFormData : function(nameValue, lifeSpanValue, genderValueValue, photoTypeValue, notesValue) {
    this.clearFormData();

    this.fullName = nameValue;
    this.lifeSpan = lifeSpanValue;
    this.genderValue = genderValueValue;
    this.photoType = photoTypeValue;
    this.notes = notesValue;
  },

  putFormData : function(index) {
    if (!this.fullName) {
      this.fullName = document.getElementById("name" + index).innerHTML;
    }
    $("#nameInput").val(this.fullName);

    if (!this.lifeSpan) {
      this.lifeSpan = document.getElementById("dates" + index).innerHTML;
    }
    $("#datesInput").val(this.lifeSpan);

    if (!this.genderValue) {
      this.genderValue = document.getElementById("genderValue" + index).innerHTML;
    }
    if (this.genderValue == "M") {
      $("input[name=male]").attr('checked', true);
    }
    else if (this.genderValue == "F") {
      $("input[name=female]").attr('checked', true);
    }
    else {
      $("input[name=male]").attr('checked', false);
      $("input[name=female]").attr('checked', false);
    }

    if (!this.photoTypeValue) {
      this.photoTypeValue = document.getElementById("typeValue" + index).innerHTML;
    }
    if (!this.photoTypeValue) {
      this.photoTypeValue = "None";
    }
    $("#photoType").val(this.photoTypeValue);

    if (!this.notes) {
      this.notes = document.getElementById("notes" + index).innerHTML;
    }
    $("#noteInput").val(this.notes);
  },

  clearFormData : function() {
    this.fullName = "";
    this.lifeSpan = "";
    this.gender = "";
    this.genderValue = "";
    this.photoType = "";
    this.photoTypeValue = "None";
    this.notes = "";
  }
};

