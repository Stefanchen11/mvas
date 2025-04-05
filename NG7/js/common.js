 $(document).ready(function() {

     setInterval(function() {
         $("h1").toggle()
     }, 1500);


     function hidemodal01() {
         $('.sweet-overlay').css('display', 'none');
         $('#win').removeClass('has-pulse');
         $('#spin').addClass('spinAround');
         setTimeout(function() {
             $('#modal02').addClass('visible');
             $('.sweet-overlay').css('display', 'block');
             setTimeout(function() {
                 $('#success02').addClass('animate');
                 $('#successtip02').addClass('animateSuccessTip');
                 $('#successlong02').addClass('animateSuccessLong');
             }, 500);
         }, 7500);
     }

     function hidemodal02() {
         $('#modal02').removeClass('visible');
         $('.sweet-overlay').css('display', 'none');
         $('#spin').addClass('spinAround2');
         setTimeout(function() {
             $('#iphone').css('display', 'block');
         }, 7000);
         setTimeout(function() {
             $('#modal03').addClass('visible');
             $('.sweet-overlay').css('display', 'block');
             setTimeout(function() {
                 $('#success03').addClass('animate');
                 $('#successtip03').addClass('animateSuccessTip');
                 $('#successlong03').addClass('animateSuccessLong');
             }, 500);
         }, 8000);

     }

    $('button#win').on('click', function(e) {

        e.preventDefault();
        var $this = $(this);
        hidemodal01();
    });
    $('button#secondTurn').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        hidemodal02();

    });

 });