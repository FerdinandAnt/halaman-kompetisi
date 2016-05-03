//banner behavior
function bannerhover() {
	document.getElementById("bannermag").style.borderColor = "#eee";
}
function bannerout() {
	document.getElementById("bannermag").style.borderColor = "#ddd";
}
function bannerclick() {
	$('#modalbanner.ui.modal').modal('show');
}


//toggle button behavior
function butupvotedown() {
	var obj = document.getElementById("upvotebutton");
	if ($("#upvotebutton").hasClass("active")) {
		obj.className = "ui tiny toggle icon button";
		obj.innerHTML = "<i class=\"star icon\"></i> Upvote This!";
	}
	else {
		obj.className = "ui tiny toggle icon active button";
		obj.innerHTML = "You Upvoted This";
	}
}
function butfollowdown() {
	var obj = document.getElementById("followbutton");
	if ($("#followbutton").hasClass("active")) {
		obj.className = "ui tiny toggle icon button";
		obj.innerHTML = "<i class=\"briefcase icon\"></i> Follow";
	}
	else {
		obj.className = "ui tiny toggle icon active button";
		obj.innerHTML = "Following";
	}
}


//comment edit/delete buttons
function butdeletedown(id) {
	var popanchor = $('#com_' + id + ' .deletebut');
	popanchor.popup({
		on: 'none',
		position : 'bottom center',
		title: 'Delete Comment?',
    content: '<center><div class="ui positive small popbut button" onclick="actcomdelyes(' + id + ')">Yes</div> \
		<div class="ui negative small popbut button" onclick="actcomdelno(' + id + ')">No</div></center>'		
	});	
	popanchor.popup('toggle');
}
function actcomdelyes(id) {
	//do some database works
	// . . .
	var popanchor = $('#com_' + id + ' .deletebut');
	var commentblock = $('#com_' + id + '.ui.comments');
	popanchor.popup('toggle');
	commentblock.fadeOut(400, function(){commentblock.html("");});
}
function actcomdelno(id) {
	var popanchor = $('#com_' + id + ' .deletebut');
	popanchor.popup('toggle');
}


function buteditdown(id) {	
	//fetch comment string from database
	// . . .
	var commentstr = "[this should be fetched form database]";
	var editorbox = $('#com_' + id + ' .editor');
	var commenttext = $('#com_' + id + ' .text.comstyler');
	//hide the text and show editor form
	commenttext.css("display", "none");
	editorbox.html("<div class=\"ui form\"><textarea>" + commentstr + "</textarea> \
		<div class=\"tiny ui teal button\" onclick=\"actsaveedit(" + id + ")\">Save Changes</div> \
		<div class=\"tiny ui button\" onclick=\"actcanceledit(" + id + ")\">Cancel</div> \
	</div>");
}
function actsaveedit(id) {
	var editorbox = $('#com_' + id + ' .editor');
	var commenttext = $('#com_' + id + ' .text.comstyler');
	var rawtext = $('#com_' + id + ' .editor textarea').html();
	//send data to server
	// . . .
	//refetch comment string from server
	// . . .
	rawtext = "[this is new data from the database]";
	editorbox.html("");
	commenttext.html(rawtext);
	commenttext.css("display", "block");
}
function actcanceledit(id) {
	var editorbox = $('#com_' + id + ' .editor');
	var commenttext = $('#com_' + id + ' .text.comstyler');
	editorbox.html("");
	commenttext.css("display", "block");
}




