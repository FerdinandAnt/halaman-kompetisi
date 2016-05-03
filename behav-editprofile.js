//hiding all but one section
document.getElementById("profiletab").style.display = "block";
document.getElementById("profsec2").style.display = "none";
document.getElementById("profsec3").style.display = "none";

function proftabclick(idx) {
	for (var i=1; i<=3; i++) {
		var secobj = document.getElementById("profsec" + i);
		var tabobj = document.getElementById("proftab" + i);
		if (secobj==null || tabobj==null) return;
		if (i==idx) {
			//activate tab and show segment
			secobj.style.display = "block";
			tabobj.className = "active item";
		}
		else {
			secobj.style.display = "none";
			tabobj.className = "item";
		}
	}
}

