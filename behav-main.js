//initialize dismissable message
$('.message.closable .close').on('click', function() {
	$obj = $(this).closest('.message.closable');
	$obj.fadeOut(300, function(){$obj.remove();});
});

//initialize popup
$('.ui.buttons div').popup();
$('.bannercontainer').popup({
	position: 'top left',
	target: '.ui.label.bannermag',
	content: 'Click to enlarge.'
});
$('.ui input').popup({
  on: 'focus',
});
$('.ui textarea').popup({
  on: 'focus',
});

//initialize dropdown
$('.ui.dropdown').dropdown();