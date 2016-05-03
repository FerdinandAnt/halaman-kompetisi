//initalize behaviors
$("#showallbutton").click(function() {
	$(".dim").show("medium");
	$(".showdet").hide();
	$(".hidedet").show();
});

$("#hideallbutton").click(function() {
	$(".dim").hide("medium");
	$(".showdet").show();
	$(".hidedet").hide();
});

$(".actiongroup").click(function() {
	var table = $(this).closest("table");
	table.find(".dim").toggle("medium");
	table.find(".actiongroup a").toggle();
});


//create buttons and collapse all;
var showhidebutcreator = "\
	<a class=\"showdet\"><i class=\"down arrow icon\"></i>Show Past Entries</a>\
	<a class=\"hidedet\" style=\"display:none\"><i class=\"up arrow icon\"></i>Hide Past Entries</a>\
";
$("div.actiongroup").append(showhidebutcreator);
$(".dim").hide();

