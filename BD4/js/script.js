var count = 1;
$(function() {
  $(".try").click(function() {
    if (!$(this).hasClass('open')) {
    if (count < 2) {
      $(this).addClass('open')
      $(this).attr('src', "img/convert-empty-rg.png");
      count++;
      setTimeout(function() {
        $('#left-try').text(3-count);
        var md2 = document.getElementById("modal02");
        md2.className += " visible";
        var so = document.querySelector(".sweet-overlay");
        so.style.display = "block";
      }, 800);
    } else {
      DeactivateConfetti();
      $('#canvasConfetti').css('opacity', '1');
      RestartConfetti();
      $(this).addClass('open');
      $(this).attr('src', "img/convert-open-rg.png");
      $(this).parent().find('.secimg').fadeIn(250);
      setTimeout(function() {
        var modal03 = document.getElementById("modal03").className += " visible";
        var sa = document.querySelector(".sweet-overlay").style.display = "block";
      }, 800);
    }

    }

  });

});
var counter = 1;
$(document).ready(function() {
  $('#update').on('click', function() {
    if (counter == 1) {
      counter++;
    }
  });
});
