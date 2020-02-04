$(document).ready(function() {

var thisMonth = 1;
var year = 2018;
var monthObject = moment(
  {
    year: year,
    month:thisMonth
  }
);
printMonth(monthObject)

});

// Function-----------------------
function printMonth(month) {
  var daysInMonth = month.daysInMonth();
  for (var i = 1; i <= daysInMonth; i++) {
    console.log(i);
    var source = $('#entry-template');
    var template = Handlebars.compile(source);
    var context = {
      number: i,
      month: month.format('MMMM')
   };
    var html = template(context);
    $('.calender').append(html);

  }
}
