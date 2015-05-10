(function() {

  var urlHash = window.location.hash.substring(1);

  var segments = urlHash.split('/');

  // URL Format: #/until/{date}
  if(segments[1] === 'until')
  {
    var targetDate = new Date(segments[2]);
    var diffDate = targetDate - Date.now();
    var daysUntil = Math.round(diffDate/(1000*60*60*24));

    document.getElementById('day-count').innerHTML = daysUntil;
    document.getElementById('day-count-explanation').innerHTML = 'days until ' + targetDate.toDateString();
  }

  // URL Format: #/since/{date}
  if(segments[1] === 'since')
  {
    var targetDate = new Date(segments[2]);
    var diffDate = Date.now() - targetDate;
    var daysUntil = Math.round(diffDate/(1000*60*60*24));

    document.getElementById('day-count').innerHTML = daysUntil;
    document.getElementById('day-count-explanation').innerHTML = 'days since ' + targetDate.toDateString();
  }

})();
