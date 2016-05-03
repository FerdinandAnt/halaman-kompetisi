//preload zebra datepicker
$(document).ready(function() {
	$('input.datepicker').Zebra_DatePicker({
		show_icon: false,
		show_select_today: false,
		show_clear_date: false,
		readonly_element: false,
		first_day_of_week: 0,
		format: 'd-m-Y'
	});
});