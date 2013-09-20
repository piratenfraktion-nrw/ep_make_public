function makePublicButtonVisibility(publicStatus) {
  if(publicStatus) {
    $('#make_public').hide();
    $('#make_closed').show();
  }
  else {
    $('#make_closed').hide();
    $('#make_public').show();
  }
}

function sendMakePublicRequest(publicStatus){
  var message = JSON.stringify({
    publicStatus: publicStatus
  });
  $.ajax('/api/pad/'+location.pathname.split('/')[2]+'/public', {
    data: message,
    contentType: 'application/json',
    type: 'POST'
  }).success(function(data) {
    makePublicButtonVisibility(publicStatus);
  });
}

//VERY UGLY HACK
$(document).ready(function() {
  $.getJSON('/api/pad/'+location.pathname.split('/')[2]+'/public')
  .success(function(data) {
    makePublicButtonVisibility(data.publicStatus);
  });
  $('#make_public_button').click(function() {
    sendMakePublicRequest(true);
  });
  $('#make_closed_button').click(function() {
    sendMakePublicRequest(false);
  });
});
