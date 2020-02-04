$(document).ready(function() {

var thisMonth = 0;
var year = 2018;
var monthObject = moment(
  {
    year: year,
    month:thisMonth
  }
);
printMonth(monthObject);
printHoliday(monthObject);

});

// Function-----------------------
function printMonth(month) {
  var daysInMonth = month.daysInMonth();
  for (var i = 1; i <= daysInMonth; i++) {
    // console.log(i);
    var source = $('#entry-template').html();
    var template = Handlebars.compile(source);
    var context = {
        number: i,
        month: month.format('MMMM'),
        date: month.format('YYYY-MM') + '-' + addZero(i)
        };
    var html = template(context);
    $('.calendar').append(html);

  }
};
function printHoliday(month) {
  $.ajax(
    {
    url : 'https://flynn.boolean.careers/exercises/api/holidays',
    method : 'GET',
    data : {
      year : month.year(),
      month : month.month()
    },
    success: function (data) {
      var holidays = data.response;
      console.log(holidays);
      for (var i = 0; i < holidays.length; i++) {
        var holiday = holidays[i].date;
        console.log(holiday);
        $('.day').each(function () {
          console.log($(this).attr('data-date'));
          if ($(this).attr('data-date') == holiday) {
            console.log($(this));
          $(this).addClass('red');
          $(this).find('.holiday-name').append(holidays[i].name);

          }
        });
      }

    },
    error : function (request, state, errors) {
      alert('Errore ' + errors);
    }

  });

};

function addZero(num) {
  if(num < 10) {
    return '0' + num;
  }
  return num;
}
