// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// Updates color coding based on current time retrieval, clears classeson update
$(function () {
   var updateColorCoding = function () {
    var currentHour = dayjs().hour();
    $('.time-block').each(function () {
      var blockHour = parseInt($(this).attr('id').split('-')[1]);
      $(this).removeClass('past present future');
    if (blockHour < currentHour) {
      $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).addClass('present');
        } else {
          $(this).addClass('future');
    }
  });
}
  // sets initial color and updates periodically
  updateColorCoding();
  setInterval(updateColorCoding, 60000);

// listener for click events to save button
  $('.saveBtn').on('click', function() {
    var timeBlockId = $(this).closest('.time-block').attr('id');
    var userInput = $(this).siblings('textarea').val();
    localStorage.setItem(timeBlockId, userInput);
  });

// load inputs from local storage
$('.time-block').each(function () {
  var timeBlockId = $(this).attr('id');
  var userInput = localStorage.getItem(timeBlockId);
  $(this).find('textarea').val(userInput);
});


  
    //Add code to display the current date in the header of the page.
    var currentDate = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(currentDate);
  });