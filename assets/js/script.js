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

  //Date render
  s_currentDay.text(currentDay.format("dddd, MMMM DD") + "th");

  //Move viewport to current hour
  //-IF the current hour is outside the hours of 9-5, then move viewport to the header
  //-IF the current hour is between 9-5, then move viewport to the current hour

  if (presentTime24Hr < 9 || presentTime24Hr > 17) {

    window.location = "#header";

  }
  else if (presentTime24Hr >= 9 && presentTime24Hr <= 17) {

    window.location = "#hour-" + presentTime24Hr.toString();

  }

  //for each hour from 9-5...
  //-add past class IF it's less than the current time
  //-add present class IF it's equal to the current time
  //-add future class IF it's more than the current time

  const hourAddClass = function (i, state) {
    return s_hourPeriod.children().eq(i).addClass(state);
  };  //  Add class to timeblock.
  //      Parameters:
  //      (1) iterable passed from for loop.
  //      (2) "past", "present" or "future".

  const hourAsNumberInLoop = function (i) {
    return Number(s_hourPeriod.children().eq(i).attr("data-hour"));
  } //  Convert data-hour attribute string to number.
  //    Parameters:
  //    (1) iterable passed from for loop.

  for (let i = 0; i < 9; i++) {

    if (hourAsNumberInLoop(i) < presentTime24Hr) {

      hourAddClass(i, "past"); // s_hourPeriod.children().eq(i).addClass("past");

    } else if (hourAsNumberInLoop(i) === presentTime24Hr) {

      hourAddClass(i, "present"); // s_hourPeriod.children().eq(i).addClass("present");

    } else if (hourAsNumberInLoop(i) > presentTime24Hr) {

      hourAddClass(i, "future"); // s_hourPeriod.children().eq(i).addClass("future");

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

  const saveBtn = function (i) {
    return s_hourPeriod.children().eq(i).children().eq(2);
  };

  for (let i = 0; i < 9; i++) {


    saveBtn(i).on("click", function () {

      let inputVal = s_hourPeriod.children().eq(i).children().eq(1).val();

      localStorage.setItem(i, inputVal);

      //Save button effect

      saveBtn(i).css({
        "background-color": "#ff6961",
        "transform": "scale(1.1)",
        "z-index": "1"
      });

      setTimeout(function () {

        saveBtn(i).css({
          "background-color": "#06aed5",
          "transform": "scale(1.0)",
          "z-index": "0"
        });


      }, 1000);

    });

  }

});
