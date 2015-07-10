(function() {

  // TODO: Clean up 'after'

  window.onhashchange = displayDateCalculation;
  displayDateCalculation();

  function displayDateCalculation()
  {

    var urlHash = window.location.hash.substring(1);

    var segments = urlHash.split('/');

    // URL Format: #/until/{date}
    if(segments[1] === 'until')
    {
      handleToDate(
        function(targetDate) { return calcDayDiff(targetDate, Date.now()) + 1; },
        segments[2],
        segments[1]
      );

      return;
    }

    // URL Format: #/since/{date}
    if(segments[1] === 'since')
    {
      handleToDate(
        function(targetDate) { return calcDayDiff(Date.now(), targetDate); },
        segments[2],
        segments[1]
      );

      return;
    }

    // URL Format: #/between/{date1}/{date2}
    if(segments[1] === 'between')
    {
      var firstDate = new Date(segments[2]);
      var secondDate = new Date(segments[3]);

      if(firstDate > secondDate) {
        var swapDate = firstDate;
        firstDate = secondDate;
        secondDate = swapDate;
      }

      if(isNaN(firstDate.getTime()) || isNaN(secondDate.getTime())) {
        displayError('Invalid date provided');
        return;
      }

      var daysBetween = calcDayDiff(secondDate, firstDate);

      if(daysBetween < 0) {
        daysBetween = 0;
      }

      var timeUnit = 'days';

      if(daysBetween === 1) {
        timeUnit = 'day';
      }

      displayDayDiff(daysBetween, timeUnit + ' between ' + getDateDisplay(firstDate) + ' and ' + getDateDisplay(secondDate));

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

  function handleToDate(dayCalc, rawTargetDate, modifier) {

    var targetDate = new Date(rawTargetDate);

    if(isNaN(targetDate.getTime())) {
      displayError('Invalid date provided');
      return;
    }

    var daysCalc = dayCalc(targetDate);

    if(daysCalc < 0) {
      daysCalc = 0;
    }

    var timeUnit = 'days';

    if(daysCalc === 1) {
      timeUnit = 'day';
    }

    displayDayDiff(daysCalc, timeUnit + ' ' + modifier + ' ' + getDateDisplay(targetDate));

    return;

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
    return Math.floor(diff/timeDivisor);

  }

  function displayError(errorMessage) {

    document.getElementById('day-count-explanation').innerHTML = errorMessage;

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
