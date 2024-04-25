// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(function () {
    //Add a listener for click events on the save button.
  $('.saveBtn').on('click', function(){
    var timeBlockId = $(this).closest('.time-block').attr('id');
    var userInput = $(this).siblings('textarea').val();
    localStorage.setItem(timeBlockId, userInput);
  });
  
    
    // apply the past, present, or future class to each time block by comparing the id to the current hour. 
    var currentHour = dayjs().hour();
    $('.time-block').each(function (){
      var timeBlockHour = parseInt($(this).attr('id').split('-')[1]);
      if (timeBlockHour < currentHour) {
        $(this).addClass('past');
        } else if (timeBlockHour === currentHour) {
          $(this).addClass('present');
          } else {
            $(this).addClass('future');
          }
    });

    function updateTimeBlocks () {
      var currentHour = dayjs().hour();
      $('.time-block').each(function() {
        var timeBlockHour = parseInt($(this).attr('id').split('-')[1]);
        if (timeBlockHour < currentHour) {
          $(this).removeClass('present future').addClass('past');
          } else if (timeBlockHour === currentHour) {
            $(this).removeClass('past future').addClass('present');
            } else {
              $(this).removeClass('past present').addClass('future');
        }
    });
    }

    updateTimeBlocks();
    setInterval(updateTimeBlocks, 60000);


    // Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. 
    $('.time-block').each(function () {
      var timeBlockId = $(this).attr('id');
      var userInput = localStorage.getItem(timeBlockId);
      $(this).find('textarea').val(userInput);
    });
    //Add code to display the current date in the header of the page.
    var currentDate = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(currentDate);
  });