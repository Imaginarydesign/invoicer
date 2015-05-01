/* jshint devel:true */

'use strict';

// from http://www.mediacollege.com/internet/javascript/number/round.html
function roundNumber(number,decimals) {
  var newString;// The new rounded number
  decimals = Number(decimals);
  if (decimals < 1) {
    newString = (Math.round(number)).toString();
  } else {
    var numString = number.toString();
    if (numString.lastIndexOf('.') === -1) {// If there is no decimal point
      numString += '.';// give it one at the end
    }
    var cutoff = numString.lastIndexOf('.') + decimals;// The point at which to truncate the number
    var d1 = Number(numString.substring(cutoff,cutoff+1));// The value of the last decimal place that we'll end up with
    var d2 = Number(numString.substring(cutoff+1,cutoff+2));// The next decimal, after the last one we want
    if (d2 >= 5) {// Do we need to round up at all? If not, the string will just be truncated
      if (d1 === 9 && cutoff > 0) {// If the last digit is 9, find a new cutoff point
        while (cutoff > 0 && (d1 === 9 || isNaN(d1))) {
          if (d1 !== '.') {
            cutoff -= 1;
            d1 = Number(numString.substring(cutoff,cutoff+1));
          } else {
            cutoff -= 1;
          }
        }
      }
      d1 += 1;
    } 
    if (d1 === 10) {
      numString = numString.substring(0, numString.lastIndexOf('.'));
      var roundedNum = Number(numString) + 1;
      newString = roundedNum.toString() + '.';
    } else {
      newString = numString.substring(0,cutoff) + d1.toString();
    }
  }
  if (newString.lastIndexOf('.') === -1) {// Do this again, to the new string
    newString += '.';
  }
  var decs = (newString.substring(newString.lastIndexOf('.')+1)).length;
  for(var i=0;i<decimals-decs;i++) newString += '0';
  //var newNumber = Number(newString);// make it a number if you like
  return newString; // Output the result to the form field (change for your purposes)
}

function updateBalance() {
  var due = $('#total').html().replace('£','') - $('#paid').val().replace('£','');
  due = roundNumber(due,2);
  $('#due').html('£'+due);
}

function updateTotal() {
  var total = 0;
  $('.price').each(function(){
    var price = $(this).html().replace('£','');
    if (!isNaN(price)) total += Number(price);
  });
  total = roundNumber(total,2);

  $('#subtotal').html('£'+total);
  $('#total').html('£'+total);
  
  updateBalance();
}

function updatePrice() {
  var row = $(this).parents('.item-row');
  var price = row.find('.cost').val().replace('£','') * row.find('.qty').val();
  isNaN(price) ? row.find('.price').html('N/A') : row.find('.price').html('£'+price);

  updateTotal();
}

function bind() {
  $('.cost').blur(updatePrice);
  $('.qty').blur(updatePrice);
}

$(document).ready(function() {

  // $("#paid").blur(updateBalance);
  
  if ($(".deleterow").length < 2) $(".deleterow").hide();

  // Add row
  $('#addrow').click(function(){
    $('.item-row:last').after('<tr class="item-row"><td><div class="del"><textarea class="form-control" id="date">Website</textarea><a href="#" class="deleterow hidden-print"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></div></td><td><textarea class="form-control description">Description</textarea></td><td><textarea class="form-control text-center cost">£100</textarea></td><td><textarea class="form-control text-center qty">1</textarea></td><td><textarea class="form-control text-center price">$100</textarea></td></tr>');
    if ($(".deleterow").length > 1) $(".deleterow").show();
    bind();

  });

  bind();
  
  // Delete row

  // Delegate click event handler to: current elements, 
  // or any future elements that will be added to the DOM
  $(document).on('click', '.deleterow' , function() {
    // $(this).parents('.item-row').remove();
    var killrow = $(this).parents('.item-row');
    killrow.fadeOut(300, function(){
      $(this).remove();
      updateTotal();
      if ($(".deleterow").length < 2) $(".deleterow").hide();
    });
  });
  


});
