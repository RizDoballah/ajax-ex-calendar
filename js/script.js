$(document).ready(function() {
  var thisMonth = 1;
  var year = 2018;
  var monthObject = moment(
    {
      year: year,
      month:thisMonth
    }
  );
  printMonth(monthObject);
  printHoliday(monthObject);

  $('.next').click(function() {
    var currentMonth = $('h3').attr('data-current-month');
    console.log(currentMonth);
    var nextMonth = moment(currentMonth).add(1, 'M');
    console.log(nextMonth);
    var invalidMonth = moment(nextMonth).month();
    console.log(invalidMonth);
    if (invalidMonth == 11) {
      $('.next').click(function() {
        alert('Invalid date');
        $('.calendar').html('');
      });
    }

    printMonth(nextMonth);
    printHoliday(nextMonth);
  });

  $('.previous').click(function () {
    var currentMonth = $('h3').attr('data-current-month');
    console.log(currentMonth);
    var previousMonth = moment(currentMonth).subtract(1, 'months');
    console.log(previousMonth);
    var invalidMonth = moment(previousMonth).month();
    console.log(invalidMonth);
    if (invalidMonth == 0) {
      $('.previous').click(function() {
        alert('Invalid date');
        $('.calendar').html('');
      });
    }

      printMonth(previousMonth);
      printHoliday(previousMonth);

  });
});
// Function-----------------------
function printMonth(month) {
  $('.calendar').html('');
  $('h3').text(month.format('MMMM YYYY'));
  $('h3').attr('data-current-month', month.format('YYYY-MM'));
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
      for (var i = 0; i < holidays.length; i++) {
        console.log(holidays[i].name);
        var holiday = holidays[i].date;
        console.log(holiday);
        $('.day').each(function() {
          // console.log($(this).attr('data-date'));
          if(holiday == $(this).attr('data-date')) {
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
}


function addZero(num) {
  if(num < 10) {
    return '0' + num;
  }
  return num;
}
