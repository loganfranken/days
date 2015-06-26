(function() {

  var urlHash = window.location.hash.substring(1);

  var segments = urlHash.split('/');

  // URL Format: #/until/{date}
  if(segments[1] === 'until')
  {
    var targetDate = new Date(segments[2]);
    var daysUntil = calcDayDiff(targetDate, Date.now());
    displayDayDiff(daysUntil, 'days until ' + targetDate.toDateString());
  }

  // URL Format: #/since/{date}
  if(segments[1] === 'since')
  {
    var targetDate = new Date(segments[2]);
    var daysSince = calcDayDiff(Date.now(), targetDate);
    displayDayDiff(daysSince, 'days since ' + targetDate.toDateString());
  }

  // URL Format: #/between/{date1}/{date2}
  if(segments[1] === 'between')
  {
    var firstDate = new Date(segments[2]);
    var secondDate = new Date(segments[3]);
    var daysBetween = calcDayDiff(secondDate, firstDate);
    displayDayDiff(daysBetween, 'days between ' + firstDate.toDateString() + ' and ' + secondDate.toDateString());
  }

  function calcDayDiff(firstDate, secondDate) {

    var diff = firstDate - secondDate;
    return Math.round(diff/(1000*60*60*24))

  }

  function displayDayDiff(dayDiff, dayDiffExplanation) {

    document.getElementById('day-count').innerHTML = dayDiff;
    document.getElementById('day-count-explanation').innerHTML = dayDiffExplanation;

  }

})();
