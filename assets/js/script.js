const s_currentDay = $("#currentDay");
const s_hourPeriod = $("#hours");

//Date
//Format: Monday, December 13th
let currentDay = dayjs();

//Present Time
let presentTime = dayjs();
let presentTimePeriod = dayjs().format("hA");
let presentTime24Hr = Number(dayjs().format("HH"));

$(function () {

  //Date
  s_currentDay.text(currentDay.format("dddd, MMMM DD") + "th");

  //Move viewport to current hour
  //-IF the current hour is outside the hours of 9-5, then move viewport to the header
  //-IF the current hour is between 9-5, then move viewport to the current hour
  if (presentTime24Hr < 9 || presentTime24Hr > 17) {

    console.log(window.location = "#header");

  }
  else if (presentTime24Hr >= 9 && presentTime24Hr <= 17) {

    console.log(window.location = "#hour-" + presentTime24Hr.toString());

  }

  //for each hour from 9-5...
  //-add past class IF it's less than the current time
  //-add present class IF it's equal to the current time
  //-add future class IF it's more than the current time

  for (let i = 0; i < 9; i++) {

    let hourAsNumberInLoop = Number(s_hourPeriod.children().eq(i).attr("data-hour")); //Convert string to number

    if (hourAsNumberInLoop < presentTime24Hr) {

      s_hourPeriod.children().eq(i).addClass("past");

    } else if (hourAsNumberInLoop === presentTime24Hr) {

      s_hourPeriod.children().eq(i).addClass("present");

    } else if (hourAsNumberInLoop > presentTime24Hr) {

      s_hourPeriod.children().eq(i).addClass("future");

    }

  }

  //Page up event listener
  $("#page-up").on("click", function () {

    window.location = "#header";

  });

  //Pull and render from localStorage

  for (let i = 0; i < 9; i++) {

    let storageVal = localStorage.getItem(i);
    s_hourPeriod.children().eq(i).children().eq(1).val(storageVal);

  }

  //localStorage set on save

  for (let i = 0; i < 9; i++) {

    s_hourPeriod.children().eq(i).children().eq(2).on("click", function () {

      let inputVal = s_hourPeriod.children().eq(i).children().eq(1).val();

      localStorage.setItem(i, inputVal);

    });


  }
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
