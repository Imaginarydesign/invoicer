/* jshint devel:true */
console.log('\'Allo \'Allo!');

$(document).ready(function() {

  'use strict';

  // Add row
  $('#addrow').click(function(){
    $('.item-row:last').after('<tr class="item-row"><td><div class="del"><textarea class="form-control" id="date">Website</textarea><a href="#" class="deleterow"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></div></td><td><textarea class="form-control" id="date">Description</textarea></td><td><textarea class="form-control" id="date">£1999</textarea></td><td><textarea class="form-control" id="date">1</textarea></td><td><textarea class="form-control" id="date">$1999</textarea></td></tr>');
  });
  
  // Delete row
  $(document).on('click', '.deleterow' , function() {
    // $(this).parents('.item-row').remove();
    var killrow = $(this).parents('.item-row');
    killrow.fadeOut(300, function(){
      $(this).remove();
    });
  });


});
