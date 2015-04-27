/* jshint devel:true */
console.log('\'Allo \'Allo!');

$(document).ready(function() {

  // 'use strict';
  
  function saveInvoice () {
    localStorage.setItem('invoice', JSON.stringify(invoice));
  }
  
  function updateInvoice () {
    $('#invoice-number').on('change', function () {
      invoice.invoice_number = $(this).val();
      saveInvoice();
    });
  }

  // check if invoice exist on localstorage
  if(localStorage['invoice'] == '' || localStorage['invoice'] == null){

    // Sample invoice
    var invoice = {
      invoice_number: 123,
      user_name: 'adam' 
    };

    saveInvoice();
    $('#invoice-number').val(invoice.invoice_number);
    updateInvoice();
    
  } else {

    var invoice = JSON.parse(localStorage.getItem('invoice'));
    updateInvoice();
    $('#invoice-number').val(invoice.invoice_number);

  }

});
