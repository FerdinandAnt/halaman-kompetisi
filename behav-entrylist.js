//submit search form
function searchcomp() {
	$("#compsearchform").submit();
}

//dropdown change handler
function drophandler(id, newval) {
	//get the object and previous value
	var dropobj = document.getElementById("drop_" + id);
	var prevval;
	if (dropobj.innerHTML == "Confirm") prevvalue = 1;
	else if (dropobj.innerHTML == "Dismiss") prevvalue = 2;
	else prevval = 0;
	
	//applying appropriate style to drop####
	if (newval == 1) dropobj.className = "text confirm";
	else if (newval == 2) dropobj.className = "text dismiss";
	else dropobj.className = "text pending";
	
	//tamper with the database using id parameter ;)
	//. . .
}