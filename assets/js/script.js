const s_currentDay = $("#currentDay");
const s_hourPeriod = $("#hours");

//Date
//Format: Monday, December 13th
let currentDay = dayjs();
s_currentDay.text(currentDay.format("dddd, MMMM DD") + "th");

//Present Time
let presentTime = dayjs();
let presentTimePeriod = dayjs().format("hA");
let presentTime24Hr = Number(dayjs().format("HH"));

//for each hour from 9-5...
//-add past class IF it's less than the current time
//-add present class IF it's equal to the current time
//-add future class IF it's more than the current time

for (let i = 0; i < 9; i++) {

  let hourAsNumberInLoop = Number(s_hourPeriod.children().eq(i).attr("data-hour"));

  if (hourAsNumberInLoop < presentTime24Hr) {

    s_hourPeriod.children().eq(i).addClass("past");

  } else if (hourAsNumberInLoop === presentTime24Hr) {

    s_hourPeriod.children().eq(i).addClass("present");

  } else if (hourAsNumberInLoop > presentTime24Hr) {

    s_hourPeriod.children().eq(i).addClass("future");

  }

}

//Move to current hour
window.location = "#hour-" + presentTime24Hr;

//Page up event listener
$("#page-up").on("click", function () {

  window.location = "#header";

});

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
