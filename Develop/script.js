// Declare Variables
var timeDisplayEl = $("#currentDay");
var saveBtn = $(".saveBtn");
//I want to get the id from the divs that contain the row-block class
var currentTime = dayjs.hour;

function displayDate() {
  //code to display the current date in the header of the page.
  var currentDate = dayjs().format("MMM DD, YYYY");
  timeDisplayEl.text(currentDate);
}
displayDate();

//Wrap all code that interacts with the DOM in a call the code isn't run until the browser has finished rendering all the elementsto jQuery to ensure that
$(document).ready(function () {
  //Get the items from local storage
  for (let i = 9; i < 18; i++) {
    var scheduledTimeSlot = localStorage.getItem(i);
    $(`#${i}`).children("textarea").val(scheduledTimeSlot);
    changeColor(i); //call during the for loop so that it sets color/Storage at same time
    console.log(i);
  }

  saveBtn.each(function () {
    //refers to EACH save button
    $(this).on("click", function () {
      //jquery's version of event listener.

      var textAreaId = $(this).parent().attr("id"); // key
      var localInput = $(this).siblings("textarea").val(); // value
      localStorage.setItem(textAreaId, localInput);
      console.log(localStorage.getItem(textAreaId));
    });
  });

  function changeColor(i) {
    if (currentTime < i) {
      $(`#${i}`).removeClass("past");
      $(`#${i}`).removeClass("present");
      $(`#${i}`).addClass("future");
    } else if (currentTime === i) {
      $(`#${i}`).addClass("present");
      $(`#${i}`).removeClass("future");
    } else {
      $(`#${i}`).addClass("past");
      $(`#${i}`).removeClass("present");
      $(`#${i}`).removeClass("future");
    }
  }
});
