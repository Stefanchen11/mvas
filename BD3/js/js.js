var timeoutHandle;
function countdown(minutes) {
  var seconds = 60;
  var mins = minutes;
  function tick() {
    var counter = document.getElementById('timer');
    var current_minutes = mins - 1;
    seconds--;
    counter.innerHTML = current_minutes.toString() + ':' + (seconds < 10 ? '0' : '') + String(seconds);
    if (seconds > 0) {
      timeoutHandle = setTimeout(tick, 1000);
    } else {
      if (mins > 1) {
        setTimeout(function () {
          countdown(mins - 1);
        }, 1000);
      }
      if (counter.innerHTML === '0:00') {
        counter.innerHTML = t;
        counter.classList.remove('b');
      }
    }
  }
  tick();
}
countdown(5);
