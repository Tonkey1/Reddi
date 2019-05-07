var formContainer = $('#form-container');

bindFormClick();
//Opening the form
function bindFormClick(){
  $(formContainer).on('click', function(e) {
    e.preventDefault();
    toggleForm();
    //Ensure container doesn't togleForm when open
    $(this).off();
  });
}

//Closing the form
$('#form-close, .form-overlay').click(function(e) {
  e.stopPropagation();
  e.preventDefault();
  toggleForm();
  bindFormClick();
});

function toggleForm(){
  $(formContainer).toggleClass('expand');
  $(formContainer).children().toggleClass('expand');
  $('body').toggleClass('show-form-overlay');
  $('.form-submitted').removeClass('form-submitted');
}

//Form validation
$('form').submit(function() {
  var form = $(this);
  form.find('.form-error').removeClass('form-error');
  var formError = false;
  
  form.find('.input').each(function() {
    if ($(this).val() == '') {
      $(this).addClass('form-error');
      $(this).select();
      formError = true;
      return false;
    }
    else if ($(this).hasClass('email') && !isValidEmail($(this).val())) {
      $(this).addClass('form-error');
      $(this).select();
      formError = true;
      return false;
    }
  });
  
  if (!formError) {
    $('body').addClass('form-submitted');
    $('#form-head').addClass('form-submitted'); 
    commentingApp ();
    setTimeout(function(){
      $(form).trigger("reset");
    }, 1000);
  }
  return false;
});

function isValidEmail(email) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(email);
};

var index = 0;
var count = 1;
var month = ["Jan","Feb","Mar","Apr", "May","Jun","Jul","Aug",
             "Sep", "Oct", "Nov", "Dec"];

function commentingApp (){
  // Store the user data
  var userName = document.getElementById('name').value;
  var userComment = document.getElementById('yourmessage').value;
  var userImage = document.getElementById('image').src;

  console.log("User Name: "+userName);
  console.log("User Comment: "+userComment);

  //Check that the inpunt and the textarea are not empty
  if(userName === "") {
    alert("please enter your username")
    return
  } else if (userComment === "") {
    alert("please enter your comment");
    return
  }

  // Create list and give a class name
  var newList = document.createElement('li');
  newList.className = 'media';
  newList.id = 'list'+index;
  var addNewListHere = document.getElementById('results');
  addNewListHere.appendChild(newList);

  // Create divs, give an id, class name, and add it to the unordered list
  var imageDiv = document.createElement('div');
  var commentDiv = document.createElement('div');
  imageDiv.id = 'image' + index;
  commentDiv.id = 'yourmessage' + index;
  imageDiv.className = 'media-left';
  commentDiv.className = 'media-body';
  var addImageDivHere = document.getElementById('list'+index);
  var addCommentDivHere = document.getElementById('list'+index);
  addImageDivHere.appendChild(imageDiv);
  addCommentDivHere.appendChild(commentDiv);

  //create an image, provide a source and add it to the unordered list
 var newImage = document.createElement('img');
  newImage.className = 'media-object';
  newImage.src = userImage;
  var addImageHere = document.getElementById('image'+ index);
  addImageHere.appendChild(newImage);

  // Create Text nodes to place comments
  var newCommentText = document.createTextNode(userComment);
  var newDate = new Date();
  var date = month[newDate.getMonth()] + " "+ newDate.getDate()+ ", "+newDate.getFullYear();
  var newUserText = document.createTextNode( userName + "  |  " + date + "   |   "+ getTimeAMPM(newDate) );

  // create paragraph and add text to it
  var addComment = document.createElement('p');
  addComment.className = 'userText1';
  addComment.appendChild(newCommentText);

  var addUserName = document.createElement('span');
  addUserName.className = 'userText2';
  addUserName.appendChild(newUserText);

  //add items to list
  commentDiv.appendChild(addComment);
  commentDiv.appendChild(addUserName);

  //create a button
  var newButton = document.createElement('button');
  newButton.className = 'delete-button';
  newButton.id = 'button'+index;
  var newButtonText = document.createTextNode('delete');
  newButton.appendChild(newButtonText);
  commentDiv.appendChild(newButton);

  //clear values of input and text
  document.getElementById('name').value = "";
  document.getElementById('yourmessage').value = "";

  //delete on click of the delete button
  document.getElementById(newButton.id).onclick = function(){deleteComment(newList.id)};
  console.log(document.getElementById(newButton.id).onclick );

  //Add increments
  index++;
  count++;

  return
}

//--------------------------------------------------------------------------

function addZero(number){
  if (number< 10 ){
    number = "0" + number;
  }
  return number;
}

//---------------------------------------------------------------------------
function getTimeAMPM(newDate) {
  // get hours, minutes, and seconds
  var h = addZero(newDate.getHours());
  var m = addZero(newDate.getMinutes());
  var s = addZero(newDate.getSeconds());
  var ampm;
  //make sure that the hour is display as an am or pm format
  if (h >=12){
    ampm = 'pm';
    h = h%12;
  } else if (h === 0) {
    h = 12;
    ampm = 'AM';
  } else {
    ampm = 'PM';
  }
  var strTime = h + ":" + m + ":" + s + " " + ampm;
  console.log("Time Comment Posted: "+strTime);
  return strTime;
}

//----------------------------------------------------------------------------
function deleteComment (commentId){
  var removeList = document.getElementById(commentId);
  var containerList = removeList.parentNode;
  containerList.removeChild(removeList);
}