
// ON PAGE LOAD
$(document).ready(function(){
	$(document).prop('title', title);
	if ( a != '' ) { $('#a .a').append('<img class="left" src="' + a + '" />'); }
	if ( a2 != '' ) { $('#a .a').append('<img class="right" src="' + a2 + '" />'); }
	$('#a .a').append('<div class="z"></div>');
	if ( b != '' ) { $('#b').html('<div class="a">' + b + '</div>'); } else { $('#b').remove(); }
	if ( d != '' ) { $('#d').html(d); } else { $('#d').remove(); }
	if ( e != '' ) { $('#e').html(e); } else { $('#e').remove(); }
	if ( g != '' ) { $('#g').html(g); } else { $('#g').remove(); }
	if ( h != '' ) { $('#h').html(h); } else { $('#h').remove(); }
	if ( k != '' ) { $('#l').html(y(k,w)); } else { $('#l').html(y(1945,w)); }
	
	if ( i != '' ) {
		var m = '';
		var foo = 0;
		$.each(i, function(idx, obj) {
			$.each(obj, function(idx, obj2) {
				foo++; n = '';
				oc = '';
				if ( obj2.comment ) {
					$.each(obj2.comment, function(idx, com) {
						oc = oc + "<p>" + com + "</p>";
					});
				}
				if ( obj2.likes > 0 ) { n = y(obj2.likes,w) + ' <span class="m"></span>'; } else { n = '<span class="m_l"></span>'; }
				m = m + '<div class="j"><div class="n"><img src="' + foo + '.png" /></div><div class="o"><div class="p">' + obj2.name + '</div><div class="q">' + oc + '</div><div class="r">' + l + ' · <span class="k"></span> ' + n + ' · <span class="s">' + obj2.time + '</span></div></div><div class="z"></div></div>';
			});
		});
		$('#k').html(m);
	} else { $('#k').remove(); }
	if ( j != '' ) { $('.m').each(function(i, obj) { $(this).html(j); }); }
	if ( m_l != '' ) { $('.m_l').html(m_l); } else { $('mm_l').remove(); }

	// modal 1
	if ( m_1_i != '' ) { $('#m_1_i').html('<img src="' + m_1_i + '" />'); } else { $('#m_1_i').remove(); }
	if ( m_1_t != '' ) { $('#m_1_t').html(m_1_t); } else { $('#m_1_t').remove(); }
	if ( m_1_d != '' ) {
		var m = '';
		$.each(m_1_d, function(idx, obj) {
			$.each(obj, function(idx, obj2) {
				m = m + '<p>' + obj2 + '</p>';
			});
		});
		$('#m_1_d').html(m);
	} else { $('#m_1_d').remove(); }
	if ( m_1_b != '' ) { $('#m_1_b a').text(m_1_b); } else { $('#m_1_b').text('OK'); }
	// modal 2
	if ( m_2_i != '' ) { $('#m_2_i').html('<img src="' + m_2_i + '" />'); } else { $('#m_2_i').remove(); }
	if ( m_2_d != '' ) { $('#m_2_d').html('<p>' + m_2_d + '</p>'); } else { $('#m_2_d').remove(); }
	if ( m_2_b != '' ) { $('#m_2_b a').text(m_2_b); } else { $('#m_2_b a').text('OK'); }
	// modal 3
	if ( m_3_t != '' ) { $('#m_3_t').html(m_3_t); } else { $('#m_3_t').remove(); }
	if ( m_3_s != '' ) { $('#m_3_s').html(m_3_s); } else { $('#m_3_s').remove(); }
	if ( m_3_i != '' ) { $('#m_3_i').html('<img src="' + m_3_i + '" />'); } else { $('#m_3_i').remove(); }
	if ( m_3_d != '' ) {
		var m = '';
		$.each(m_3_d, function(idx, obj) {
			$.each(obj, function(idx, obj2) {
				m = m + '<p>' + obj2 + '</p>';
			});
		});
		$('#m_3_d').html(m);
	} else { $('#m_3_d').remove(); }
	if ( m_3_b != '' ) { $('#m_3_b a').text(m_3_b); } else { $('#m_3_b a').text('OK'); }
	
	if ( win != '' ) { $('.w').each(function(i, obj) { $(this).html(win); }); }
	if ( win_brand != '' ) { $('.w_b').each(function(i, obj) { $(this).html(win_brand); }); }
	
	// load boxes
	for (i = 0; i < 12; i++) {
		$('#i').append('<div class="e" id="b_' + i + '"><div class="f"><div class="g"><a href="#" onclick="cl(\'b_' + i + '\');return false;"><img src="a.png" /></a></div></div></div>');
	}
	$('#i').append('<div class="z"></div>');
	
	//load modal 1
	$('#m').fadeIn( "slow", function() {
		$('#m_1').fadeIn( "200", function() {});
		$('#m_1 .t_a').removeClass('small');
	});
	
	// dates
	var mydate = new Date();
	mydate.setDate(mydate.getDate()-0);
	
	var year=mydate.getYear();
	if (year < 1000) { year += 1900; }
	
	var day = mydate.getDay();
	var month = mydate.getMonth();
	
	var daym = mydate.getDate();
	if ( daym < 10 ) { daym = "0" + daym; }
	
	$('.date_day_number').each(function(i, obj) { $(this).html( daym ); });
	$('.date_month').each(function(i, obj) { $(this).html( array_month[month] ); });
	$('.date_day_week').each(function(i, obj) { $(this).html( array_day[day] ); });
	
});
// ON PAGE LOAD

// ON CLICK
function cl(x) {
	if ( try_num > 2 ) {
		$('#try').html(m_2_d_2);
	} else {
		$('#try').html(m_2_d_1);
	}
	if ( try_num > 1 ) {
		try_num = try_num - 1;
		$('#' + x).html('<div class="f"><div class="h"><div></div></div></div>');
		$('#m').fadeIn( "slow", function() {
			$('#m_2').fadeIn( "200", function() {});
			$('#m_2 .t_a').removeClass('small');
		});
	} else {
		// win
		$('#' + x).html('<div class="f"><div class="i"><div></div><div></div><div></div></div></div>');
		if ( win_box != '' ) { $('#' + x + ' .i div:nth-child(1)').css("background","url('"+win_box+"')"); }
		if ( win_box != '' ) { $('#' + x + ' .i div:nth-child(1)').css("background-size","contain"); }
		$('#m').fadeIn( "slow", function() {
			$('#m_3').fadeIn( "200", function() {});
			$('#m_3 .t_a').removeClass('small');
		});
	}
}
// ON CLICK

// COMMA
function y(x,y) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, y);
}
// COMMA