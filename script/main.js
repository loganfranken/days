(function() {

  window.onhashchange = displayDateCalculation;
  displayDateCalculation();

  function displayDateCalculation()
  {
    resetDisplay();

    var urlHash = window.location.hash.substring(1);

    var segments = urlHash.split('/');

    // URL Format: #/until/{date}
    if(segments[1] === 'until')
    {
      handleDateDiff(
        function(targetDate) { return calcDayDiff(targetDate, Date.now()) + 1; },
        segments[2],
        segments[1]
      );

      return;
    }

    // URL Format: #/since/{date}
    if(segments[1] === 'since')
    {
      handleDateDiff(
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

      if(!isValidDate(firstDate) || !isValidDate(secondDate)) {
        displayError('Invalid date provided');
        return;
      }

      if(firstDate > secondDate) {
        var swapDate = firstDate;
        firstDate = secondDate;
        secondDate = swapDate;
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
      handleDateDayCalc(
        function(targetDate, daysAfter) {

          var dateAfter = new Date(targetDate.getTime());
          dateAfter.setDate(targetDate.getDate() + daysAfter);
          return dateAfter;

        },
        segments[3],
        segments[1],
        'after'
      );

      return;
    }

    // URL Format: #/{count}/before/{date1}
    if(segments[2] === 'before')
    {
      handleDateDayCalc(
        function(targetDate, daysBefore) {

          var dateAfter = new Date(targetDate.getTime());
          dateAfter.setDate(targetDate.getDate() - daysBefore);
          return dateAfter;

        },
        segments[3],
        segments[1],
        'before'
      );

      return;
    }
  }

  function handleDateDiff(dayCalc, rawTargetDate, modifier) {

    var targetDate = new Date(rawTargetDate);

    if(!isValidDate(targetDate)) {
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

  function handleDateDayCalc(dayCalc, rawTargetDate, rawDaysModifier, modifier) {

    var targetDate = new Date(rawTargetDate);

    if(!isValidDate(targetDate)) {
      displayError('Invalid date provided');
      return;
    }

    var daysModifier = +(rawDaysModifier);

    if(isNaN(daysModifier)) {
      displayError('Invalid number of days provided');
      return;
    }

    var calcDate = dayCalc(targetDate, daysModifier);

    if(!isValidDate(calcDate)) {
      displayError('Unable to calculate new date');
      return;
    }

    var timeUnit = 'days';

    if(daysModifier === 1) {
      timeUnit = 'day';
    }

    displayDayCalc(daysModifier + ' ' + timeUnit + ' ' + modifier + ' ' + getDateDisplay(targetDate) + ' is', getDateDisplay(calcDate));

    return;

  }

  function isValidDate(input) {
    return !isNaN(input.getTime());
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

  function resetDisplay() {

    document.getElementById('day-count-explanation').innerHTML = '';
    document.getElementById('day-count').innerHTML = '';
    document.getElementById('day-count-explanation').innerHTML = '';
    document.getElementById('day-calc-result').innerHTML = '';
    document.getElementById('day-calc-explanation').innerHTML = '';

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
