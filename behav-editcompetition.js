var mileinput = {
	maxitem: 0,
	tableobj: null,
	textareaobj: null
};


//count remaining characters
function countteaser() {
	var counterobj = document.getElementById("teasercount");
	var sourceobj = document.getElementById("txt_compteaser");
	var remchar = 140 - sourceobj.value.length;
	counterobj.innerHTML = remchar + " remaining";
}

//append data before submitting
function appenddata() {
	//append CKEdior value
	var textdata = CKEDITOR.instances.editor1.getData();
	$("#txt_compdetails").val(textdata);
	//append milestone entries
	parsemiledata();
}

function escapehtml(str) {
	return str
	.replace(/&/g, "&amp;")
	.replace(/</g, "&lt;")
	.replace(/>/g, "&gt;")
	.replace(/"/g, "&quot;")
	.replace(/'/g, "&#039;");
}

//date & name format validity
function dnvalid(inpdate, inpname) {
	if (/^\d\d-\d\d-\d\d\d\d$/g.test(inpdate) && /\S/g.test(inpname)) return true;
	else return false;
}
function dnvalidate(id) {
	if (dnvalid($("#txt_d_" + id).val(), $("#txt_n_" + id).val()))
	$("#mile_" + id).removeClass("error");
	else $("#mile_" + id).addClass("error");
}

//add or remove lines from the table
function miletableadd(inpdate, inpname, noanim) {
	inpdate = escapehtml(inpdate);
	inpname = escapehtml(inpname);
	var id = ++(mileinput.maxitem);
	var rowstring = "\
		'<tr class=\"entry\" id=\"mile_" + id + "\">\
		<td><input class=\"date\" id=\"txt_d_" + id + "\" type=\"text\" placeholder=\"dd-mm-yyyy\" value=\"" + inpdate + "\"></td>\
		<td><input class=\"name\" id=\"txt_n_" + id + "\" type=\"text\" placeholder=\"Type caption here...\" value=\"" + inpname + "\">\
		<span>" + inpname + "</span></td>\
		<td><a onclick=\"miletableremove("+ id +")\"><i class=\"remove icon\"></i>Remove</a></td>\
		</tr>\
	";
	mileinput.tableobj.append(rowstring);
	//manage span/input toggling
	$("#mile_" + id + " td:nth-of-type(2) input").hide();
	$("#mile_" + id + " td:nth-of-type(1) input").blur(function() {dnvalidate(id);});
	$("#mile_" + id + " td:nth-of-type(2) input").blur(function() {miletabletoggle(id);});
	$("#mile_" + id + " td:nth-of-type(2)").click(function() {miletabletoggle(id);});
	if (!noanim) {
		//start animation
		$("#mile_" + id)
		.find('td')
		.wrapInner('<div style="display:none;">')
		.parent()
		.find('td > div')
		.slideDown(400, function() {
			var $set = $(this);
			$set.replaceWith($set.contents());
		});
	}
}

function miletableremove(id) {
	//start animation
	$("#mile_" + id)
	.find('td')
	.wrapInner('<div style="display:block;">')
	.parent()
	.find('td > div')
	.slideUp(400, function() {
		$(this).parent().parent().remove();
	});
	//a little reduction wouldn't be bad
	if (id == mileinput.maxitem) mileinput.maxitem--;
}

//handling when milestone caption cell is clicked
function miletabletoggle(id) {
	var spanobj = $("#mile_" + id + " td:nth-of-type(2) span").toggle();
	var inpobj = $("#mile_" + id + " td:nth-of-type(2) input").toggle();
	if (inpobj.is(":visible")) inpobj.select();
	//check data validity
	dnvalidate(id);
	spanobj.text(inpobj.val());
}

//parse existing textarea entries to table on load
function initparser() {
	var linesplit = mileinput.textareaobj.val().replace(/\r\n/g, "\n").split("\n");
	for (var i=0; i<linesplit.length; i++) {
		if (/^\d\d-\d\d-\d\d\d\d: /g.test(linesplit[i])) {
			var partdate = linesplit[i].substring(0,10);
			var partname = linesplit[i].substring(12);
			miletableadd(partdate,partname,true);
		}
	}
}

//process entry from #milenewinputblock
function processnewentry() {
	//if date format is correct AND caption input has at least one non-whitespace character
	if (dnvalid($("#newmile_d").val(), $("#newmile_n").val())) {
		miletableadd($("#newmile_d").val(),$("#newmile_n").val());
		$("#milenewinputblock tr:last-child").removeClass("error");
		$("#newmile_d").val("");
		$("#newmile_n").val("");
		recalldatepicker();
	}
	else {
		$("#milenewinputblock tr:last-child").addClass("error");
	}
}

//re-initialize date picker
function recalldatepicker() {
	$('#mileinputblock input.date, #milenewinputblock input.date').Zebra_DatePicker({
		show_icon: false,
		show_select_today: false,
		show_clear_date: false,
		readonly_element: false,
		first_day_of_week: 0,
		format: 'd-m-Y',
	});
}

//export-import milestone data
function parsemiledata() {
	var miledata = "";
	for (var i=1; i<=mileinput.maxitem; i++) {
		var strdate = $("#txt_d_" + i).val();
		var strname = $("#txt_n_" + i).val();
		if (dnvalid(strdate,strname)) {
			miledata += strdate + ": ";
			miledata += strname + "\r\n";
		}
	}
	$("#txt_milestones").val(miledata);
}
function expbutdown() {
	parsemiledata();
	var popanchor = $('#expbut');
	popanchor.popup({
		on: 'none',
		position : 'bottom center',
		title: 'Export Data',
    content: 'Copy (Ctrl+C) the following data.<textarea id="txt_expdata" readonly>' + $("#txt_milestones").val() + '</textarea> <div class="ui negative small popbut button" onclick="expbutclose()">Close</div>'
	});
	popanchor.popup('toggle');
	$("#txt_expdata").select();
}
function impbutdown() {
	var popanchor = $('#impbut');
	popanchor.popup({
		on: 'none',
		position : 'bottom center',
		title: 'Import Data',
    content: 'Paste (Ctrl+V) milestone data.<textarea id="txt_impdata"></textarea> <div class="ui positive small popbut button" onclick="impbutmerge()">Merge Data</div> <div class="ui negative small popbut button" onclick="impbutclose()">Close</div>'
	});	
	popanchor.popup('toggle');
	$("#txt_impdata").focus();
}
function clrbutdown() {
	var popanchor = $('#clrbut');
	popanchor.popup({
		on: 'none',
		position : 'bottom center',
		title: 'Clear Entries?',
    content: '<center><div class="ui positive small popbut button" onclick="clrbutclear()">Yes</div> \
		<div class="ui negative small popbut button" onclick="clrbutclose()">No</div></center>'
	});	
	popanchor.popup('toggle');
	$("#txt_impdata").focus();
}
function expbutclose() {
	var popanchor = $('#expbut');
	popanchor.popup('toggle');
}
function impbutclose() {
	var popanchor = $('#impbut');
	popanchor.popup('toggle');
}
function impbutmerge() {
	//merge data
	var linesplit = $("#txt_impdata").val().replace(/\r\n/g, "\n").split("\n");
	for (var i=0; i<linesplit.length; i++) {
		if (/^\d\d-\d\d-\d\d\d\d: /g.test(linesplit[i])) {
			var partdate = linesplit[i].substring(0,10);
			var partname = linesplit[i].substring(12);
			miletableadd(partdate,partname);
		}
	}
	impbutclose();
}
function clrbutclose() {
	var popanchor = $('#clrbut');
	popanchor.popup('toggle');
}
function clrbutclear() {
	//delete displayed data
	for (var i=1; i<=mileinput.maxitem; i++) {
		miletableremove(i);
	}
	//reset variiables
	mileinput.maxitem = 0;
	$("#txt_milestones").val("");
	clrbutclose();
}


/* ===============<< MAIN >>=============== */

//activate and configure CKEditor
CKEDITOR.appendTo("ckeditcont",null,"");
CKEDITOR.config.contentsCss = 'ckeditor/custom-ruling.css';
CKEDITOR.stylesSet.add('default', [
	//Block Styles
	{name: 'Title', element: 'h1', styles: null},
	{name: 'Subtitle', element: 'h2', styles: null},
	//Inline Styles
	{name: 'Red Color', element: 'span', styles: {'color': 'red'}},
	{name: 'Blue Color', element: 'span', styles: {'color': 'blue'}},
	{name: 'Green Color', element: 'span', styles: {'color': 'green'}},
	{name: 'Purple Color', element: 'span', styles: {'color': 'purple'}},
	{name: 'Grey Color', element: 'span', styles: {'color': 'grey'}},
	{name: 'Keyword', element: 'code', styles: null}
]);

//configure HTML display
$(document).ready(function() {
	$(".nojs").css("display","none");
	$("#compdetailscont").css("display","none");
	$("#txt_milestones").css("display","none");
	
	//construct milestone input table
	$("#txt_milestones").after('<table id="mileinputblock"></table>');
	$("#mileinputblock").html("\
		<tr class=\"header\"><th colspan=3><div class=\"actiongroup\">\
		<a id=\"clrbut\" onclick=\"clrbutdown()\"><i class=\"magic icon\"></i>Clear</a>\
		<a id=\"expbut\" onclick=\"expbutdown()\"><i class=\"upload disk icon\"></i>Export Data</a>\
		<a id=\"impbut\" onclick=\"impbutdown()\"><i class=\"download disk icon\"></i>Import Data</a>\
		</div></th></tr>\
	");
	$("#mileinputblock").after("\
		<table id=\"milenewinputblock\">\
		<tr><th colspan=3><i class=\"flipped reply mail icon\"></i>ADD NEW ENTRY</th></tr><tr>\
		<td><input class=\"date\" id=\"newmile_d\" type=\"text\" placeholder=\"dd-mm-yyyy\"></td>\
		<td><input class=\"name\" id=\"newmile_n\" type=\"text\" placeholder=\"Add new entry...\"></td>\
		<td><a onclick=\"processnewentry()\"><i class=\"add icon\"></i>Add Entry</a></td>\
		</tr></table>\
	");
	
	//parse existing text value
	mileinput.tableobj = $("#mileinputblock");
	mileinput.textareaobj = $("#txt_milestones");
	initparser();
	recalldatepicker();
});