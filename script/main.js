(function() {

  // TODO: Handle invalid dates

  window.onhashchange = displayDateCalculation;
  displayDateCalculation();

  function displayDateCalculation()
  {

    var urlHash = window.location.hash.substring(1);

    var segments = urlHash.split('/');

    // URL Format: #/until/{date}
    if(segments[1] === 'until')
    {
      var targetDate = new Date(segments[2]);
      var daysUntil = calcDayDiff(targetDate, Date.now());

      if(daysUntil < 0) {
        daysUntil = 0;
      }

      var timeUnit = 'days';

      if(daysUntil === 1) {
        timeUnit = 'day';
      }

      displayDayDiff(daysUntil, timeUnit + ' until ' + getDateDisplay(targetDate));

      return;
    }

    // URL Format: #/since/{date}
    if(segments[1] === 'since')
    {
      var targetDate = new Date(segments[2]);
      var daysSince = calcDayDiff(Date.now(), targetDate);
      displayDayDiff(daysSince, 'days since ' + targetDate.toDateString());

      return;
    }

    // URL Format: #/between/{date1}/{date2}
    if(segments[1] === 'between')
    {
      var firstDate = new Date(segments[2]);
      var secondDate = new Date(segments[3]);
      var daysBetween = calcDayDiff(secondDate, firstDate);
      displayDayDiff(daysBetween, 'days between ' + firstDate.toDateString() + ' and ' + secondDate.toDateString());

      return;
    }

    // URL Format: #/{count}/after/{date1}
    if(segments[2] === 'after')
    {
      var targetDate = new Date(segments[3]);
      var daysAfter = +segments[1];
      var dateAfter = new Date();
      dateAfter.setDate(targetDate.getDate() + daysAfter);
      displayDayCalc(daysAfter + ' days after ' + targetDate.toDateString() + ' is', dateAfter.toDateString());

      return;
    }

    // URL Format: #/{count}/before/{date1}
    if(segments[2] === 'before')
    {
      var targetDate = new Date(segments[3]);
      var daysBefore = +segments[1];
      var dateBefore = new Date();
      dateBefore.setDate(targetDate.getDate() - daysBefore);
      displayDayCalc(daysBefore + ' days before ' + targetDate.toDateString() + ' is', dateBefore.toDateString());

      return;
    }

  }

  function getDateDisplay(date) {

    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var day = dayNames[date.getUTCDay()];
    var month = monthNames[date.getUTCMonth()];

    return day + ", " + month + " " + date.getUTCDate() + ", " + date.getUTCFullYear();

  }

  function calcDayDiff(firstDate, secondDate) {

    var timeDivisor = (1000*60*60*24);

    var diff = firstDate - secondDate;
    return Math.ceil(diff/timeDivisor);

  }

  function displayDayDiff(dayDiff, dayDiffExplanation) {

    document.getElementById('day-count').innerHTML = dayDiff;
    document.getElementById('day-count-explanation').innerHTML = dayDiffExplanation;

  }

  function displayDayCalc(dayCalcExplanation, dayCalcResult) {

    document.getElementById('day-calc-result').innerHTML = dayCalcResult;
    document.getElementById('day-calc-explanation').innerHTML = dayCalcExplanation;

  }

})();
