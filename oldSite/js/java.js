/* File Path Slice and Substring for logos & icons */
var URLlength = location.href.length;
var FilePathStart = 0;
var FilePathEnd = 0;
var FixedURLNum = location.href

/*URL redirect to HTTPS */
function LoadHttps(){

	/* Local */
	if ((location.protocol == 'file:')||(location.href.substr(0, 10) == "http://127")){
        var fixedPosLocal = 0;
        fixedPosLocal = FixedURLNum.indexOf("Telos");
        console.log(fixedPosLocal);
        console.log("local");
        console.log(location.href);
        console.log(URLlength);
        if(location.protocol == 'file:'){
            FilePathStart = fixedPosLocal + 6;
            FilePathEnd = fixedPosLocal + 25;
        } else if(location.href.substr(0, 10) == "http://127"){
            FilePathStart = fixedPosLocal + 23;
            FilePathEnd = fixedPosLocal + 51;
        }
		
	}
	/* Online */
	else if ((location.protocol != 'file:')&&(location.href.substr(0, 10) != "http://127")){
		console.log("online");
        console.log(location.href);
		var fixedPosOnline = 0;
		var fixedPosCom = 0;
		fixedPosOnline = FixedURLNum.indexOf(".online");
		fixedPosCom = FixedURLNum.indexOf(".com");
		if (fixedPosOnline > 0) {
			console.log(location.href);
			console.log(URLlength);
			FilePathStart = fixedPosOnline + 7;
			FilePathEnd = fixedPosOnline + 35;
		} else {
			console.log(location.href);
			console.log(URLlength);
			FilePathStart = fixedPosCom + 4;
			FilePathEnd = fixedPosCom + 32;
		}
	}
}

function navNum(i) {
	var HomeVar = document.getElementById("Home");
	var AboutVar = document.getElementById("About");
	var BountiesVar = document.getElementById("Bounties");
	var DisclosureVar = document.getElementById("Disclosure");
	var Contact_usVar = document.getElementById("Contact_us");
	HomeVar.className = AboutVar.className = BountiesVar.className = DisclosureVar.className = Contact_usVar.className = "topnav a";
    
/*Home*/
if (i == 1) {
		HomeVar.className = "active";
		document.getElementById('CTh1').innerHTML = "Telos Central";
		document.getElementById('Arrow').style.visibility = "visible";
        document.getElementById('ArrowText').style.visibility = "visible";
		document.getElementById('ArrowLink').href = "#HomePage";
		document.getElementById('CTp1').style.display = "block";
		document.getElementById('CTp1').style.textAlign = "center";
		document.getElementById('CTp2').style.display = "none";
		document.getElementById('CTp3').style.display = "none";
		document.getElementById('CTp4').style.display = "none";
		document.getElementById('CTp5').style.display = "none";
		document.getElementById('logo').style.display = "block";
		document.getElementById('SIcon1').style.display = "none";
		document.getElementById('SIcon2').style.display = "none";
		document.getElementById('SIcon3').style.display = "none";
		document.getElementById('SIcon4').style.display = "none";
		document.getElementById('SIcon5').style.display = "none";
		document.getElementById('HomePage').style.display = "block";
		document.getElementById('AboutPage').style.display = "none";
		document.getElementById('BountyPage').style.display = "none";
		document.getElementById('DisclosuresPage').style.display = "none";
        //Remove the two info boxes, except on the home page.
        document.getElementById("VoteBox").style.display = "block";
		document.getElementById("WinningPost").style.display = "block";
		console.log(i);
		if (document.getElementById('myTopnav').className ==='topnav responsive') {myFunction()};
		if (CurrentTheme == "Retro"){
			Theme1.className = "active";
		}
	}
/*About*/
else if (i == 2) {
		AboutVar.className = "active";
		document.getElementById('Arrow').style.visibility = "visible";
        document.getElementById('ArrowText').style.visibility = "visible";
		document.getElementById('ArrowLink').href = "#AboutUs";
		document.getElementById('CTh1').innerHTML = "Telos Central";
		document.getElementById('CTp1').style.display = "none";
		document.getElementById('CTp2').style.display = "block";
		document.getElementById('CTp2').style.textAlign = "center";
		document.getElementById('CTp3').style.display = "none";
		document.getElementById('CTp4').style.display = "none";
		document.getElementById('CTp5').style.display = "none";
		document.getElementById('logo').style.display = "none";
		document.getElementById('SIcon1').style.display = "none";
		document.getElementById('SIcon2').style.display = "none";
		document.getElementById('SIcon3').style.display = "none";
		document.getElementById('SIcon4').style.display = "none";
		document.getElementById('SIcon5').style.display = "none";
		document.getElementById('HomePage').style.display = "none";
		document.getElementById('AboutPage').style.display = "block";
		document.getElementById('BountyPage').style.display = "none";
		document.getElementById('DisclosuresPage').style.display = "none";
        //Remove the two info boxes, except on the home page.
        document.getElementById("VoteBox").style.display = "none";
		document.getElementById("WinningPost").style.display = "none";
		console.log(i);
		if (document.getElementById('myTopnav').className ==='topnav responsive') {myFunction()};
	}
/*Bounties*/
else if (i == 3) {
		BountiesVar.className = "active";
		document.getElementById('Arrow').style.visibility = "visible";
        document.getElementById('ArrowText').style.visibility = "visible";
		document.getElementById('ArrowLink').href = "#ActiveBounties";
		document.getElementById('CTh1').innerHTML = "Bounty Hunts";
		document.getElementById('CTp1').style.display = "none";
		document.getElementById('CTp2').style.display = "none";
		document.getElementById('CTp3').style.display = "block";
		document.getElementById('CTp4').style.display = "none";
		document.getElementById('CTp5').style.display = "none";
		document.getElementById('logo').style.display = "none";
		document.getElementById('SIcon1').style.display = "none";
		document.getElementById('SIcon2').style.display = "none";
		document.getElementById('SIcon3').style.display = "none";
		document.getElementById('SIcon4').style.display = "none";
		document.getElementById('SIcon5').style.display = "none";
		document.getElementById('HomePage').style.display = "none";
		document.getElementById('AboutPage').style.display = "none";
		document.getElementById('BountyPage').style.display = "block";
		document.getElementById('DisclosuresPage').style.display = "none";
        //Remove the two info boxes, except on the home page.
        document.getElementById("VoteBox").style.display = "none";
		document.getElementById("WinningPost").style.display = "none";
		console.log(i);
		if (document.getElementById('myTopnav').className ==='topnav responsive') {myFunction()};
	}

/*Disclosure*/
else if (i == 4){
		DisclosureVar.className = "active";
		document.getElementById('Arrow').style.visibility = "visible";
        document.getElementById('ArrowText').style.visibility = "visible";
		document.getElementById('ArrowLink').href = "#Code of Conduct";
		document.getElementById("CTh1").innerHTML = "Everything you need to know about us";
		document.getElementById('CTp1').style.display = "none";
		document.getElementById('CTp2').style.display = "none";
		document.getElementById('CTp3').style.display = "none";
		document.getElementById('CTp4').style.display = "block";
		document.getElementById('CTp4').style.textAlign = "left";
		document.getElementById('CTp5').style.display = "none";
		document.getElementById('logo').style.display = "none";
		document.getElementById('SIcon1').style.display = "none";
		document.getElementById('SIcon2').style.display = "none";
		document.getElementById('SIcon3').style.display = "none";
		document.getElementById('SIcon4').style.display = "none";
		document.getElementById('SIcon5').style.display = "none";
		document.getElementById('HomePage').style.display = "none";
		document.getElementById('AboutPage').style.display = "none";
		document.getElementById('BountyPage').style.display = "none";
		document.getElementById('DisclosuresPage').style.display = "block";
        //Remove the two info boxes, except on the home page.
        document.getElementById("VoteBox").style.display = "none";
		document.getElementById("WinningPost").style.display = "none";
		console.log(i);
		if (document.getElementById('myTopnav').className ==='topnav responsive') {myFunction()};
	}
/*Contact us*/
else if (i == 5) {
		Contact_usVar.className = "active";
		document.getElementById('Arrow').style.visibility = "hidden";
        document.getElementById('ArrowText').style.visibility = "hidden";
		document.getElementById('CTh1').innerHTML = "Social Media & Email";
		document.getElementById('CTp1').style.display = "none";
		document.getElementById('CTp2').style.display = "none";
		document.getElementById('CTp3').style.display = "none";
		document.getElementById('CTp4').style.display = "none";
		document.getElementById('CTp5').style.display = "block";
		document.getElementById('CTp5').style.textAlign = "center";
		document.getElementById('logo').style.display = "none";
		document.getElementById('SIcon1').style.display = "inline-block";
		document.getElementById('SIcon2').style.display = "inline-block";
		document.getElementById('SIcon3').style.display = "inline-block";
		document.getElementById('SIcon4').style.display = "inline-block";
		document.getElementById('SIcon5').style.display = "inline-block";
		document.getElementById('HomePage').style.display = "none";
		document.getElementById('AboutPage').style.display = "none";
		document.getElementById('BountyPage').style.display = "none";
		document.getElementById('DisclosuresPage').style.display = "none";
        //Remove the two info boxes, except on the home page.
        document.getElementById("VoteBox").style.display = "none";
		document.getElementById("WinningPost").style.display = "none";
		console.log(i);
		if (document.getElementById('myTopnav').className ==='topnav responsive') {myFunction()};
	} 
}

/* Highlight upon scroll */
function highlight(z){

var HighlightStyleH1 = "None";
var HighlightStyleH2 = "None";

	if (CurrentTheme == "Retro"){
		HighlightStyleH1 = 'highlightRetroH1';
		HighlightStyleH2 = 'highlightRetroH2';
	} else if (CurrentTheme == "Dark"){
		HighlightStyleH1 = 'highlightRetroH2';
		HighlightStyleH2 = 'highlightRetroH1';
	} else if (CurrentTheme == "Femine"){
		HighlightStyleH1 = 'highlightRetroH2';
		HighlightStyleH2 = 'highlightRetroH1';
	}

	if (z == 1){
		var myBox = $('#blockproducers h2:nth-child(3)');
		myBox.addClass(HighlightStyleH1);
		console.log("added class highlight");
		myBox.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
	    function(e) {
	    // code to execute after animation ends
	    myBox.removeClass(HighlightStyleH1);
	    });
	}
	else if (z == 2){
		var myBox = $('#games h2:nth-child(3)');
		var myBox1 = $('#gamblinggames h2:nth-child(3)');
		myBox.addClass(HighlightStyleH1);
		myBox1.addClass(HighlightStyleH1);
		myBox.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
	    function(e) {
	    // code to execute after animation ends
	    myBox.removeClass(HighlightStyleH1);
	    myBox1.removeClass(HighlightStyleH1);
	    });
	}
	else if (z == 3){
		var myBox = $('#proxies h2:nth-child(3)');
		myBox.addClass(HighlightStyleH1);
		myBox.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
	    function(e) {
	    // code to execute after animation ends
	    myBox.removeClass(HighlightStyleH1);
	    });
	}
	else if (z == 4){
		var myBox = $('#wallets h2:nth-child(3)');
		myBox.addClass(HighlightStyleH1);
		myBox.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
	    function(e) {
	    // code to execute after animation ends
	    myBox.removeClass(HighlightStyleH1);
	    });
	}
	else if (z == 5){
		var myBox = $('#Sqrl');
		myBox.addClass(HighlightStyleH2);
		myBox.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
	    function(e) {
	    // code to execute after animation ends
	    myBox.removeClass(HighlightStyleH2);
	    });
	}
	    else if (z == 6){
		var myBox = $('#Events h2:nth-child(3)');
		myBox.addClass(HighlightStyleH1);
		myBox.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
	    function(e) {
	    // code to execute after animation ends
	    myBox.removeClass(HighlightStyleH1);
	    });
	}
        else if (z == 7){
		var myBox = $('#Trex h2:nth-child(3)');
		myBox.addClass(HighlightStyleH1);
		myBox.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
	    function(e) {
	    // code to execute after animation ends
	    myBox.removeClass(HighlightStyleH1);
	    });
	}
    else if (z == 8){
		var myBox = $('#FiatGateways');
		myBox.addClass(HighlightStyleH1);
		myBox.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
	    function(e) {
	    // code to execute after animation ends
	    myBox.removeClass(HighlightStyleH1);
	    });
	}
    
}

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
var togglemenu;
function myFunction() {
	if (document.getElementById("myTopnav").className === "topnav") {
		document.getElementById("CoverText").className = "FadeOut";
		console.log("Covertext FadeOut")
		setTimeout(myFunction1, 250)
	}
	else {
		document.getElementById("myTopnav").className = "topnav";
		togglemenu = 1;
		console.log(document.getElementById("myTopnav").className);
		console.log("Covertext FadeIn")
		document.getElementById("CoverText").className = "FadeIn";
	}
}
function myFunction1() {
	togglemenu = 0;
	console.log(document.getElementById("myTopnav").className);
	document.getElementById("myTopnav").className += " responsive";
}

/* Colour Themes */
/* Retro */
var RetroBackground = "#E5DFC5";
var RetroCoverText = "rgba(255, 255, 255, 0.7)";
var RetroCoverText1 = "#F7F5EE"
var RetroForground = "rgba(0, 0, 0, 0.4)";
var RetroPopup = "white";
var RetroParticleColour = "#52050A";
var RetroParticlePencil = "#000000";
var RetroShadow = "4px 4px 8px 4px rgba(0, 0, 0, 0.4)";

/* Dark */
var DarkBackground = "#0C0A15";
var DarkForground = "rgba(199,221,240,0.5)";
var DarkBoxes = "rgba(199,221,240,0.8)";
var DarkPopup = "#F0F3F5";
var DarkParticleColour = "#548687";
var DarkParticlePencil = "#FFFFFF";
var DarkShadow = "4px 4px 8px 4px rgba(0, 0, 0, 0.4)";

/* Femine */
var FemineBackground = "#413E4C";
var FemineForground = "rgba(255, 215, 215, 0.5)";
var FemineBoxes = "rgba(255, 215, 215, 0.8)"
var FeminePopup = "white";
var FemineParticleColour = "#E0B0D5";
var FemineParticlePencil = "#FFFFFF";
var FemineShadow = "4px 4px 8px 4px rgba(0, 0, 0, 0.4)";

var CurrentTheme = 0;
var Shade = "";
var newColor = "";

function Theme(j){
	var Theme1 = document.getElementById("Theme1");
	var Theme2 = document.getElementById("Theme2");
	var Theme3 = document.getElementById("Theme3");
	Theme1.className = Theme2.className = Theme3.className = "topnav a";

	var l = document.getElementsByTagName("canvas");
	var m = document.getElementsByClassName("TCentralLogo");
	var n = document.getElementsByClassName("popupboxlefttext");
	var o = document.getElementsByClassName("popupboxrighttext");
	var p = document.getElementById("HomePage").getElementsByTagName("ul");
	var q = document.getElementById("myTopnav").getElementsByTagName("a");
	var r = document.getElementsByClassName("owners");
	var s = document.getElementById("Hardware").getElementsByTagName("div");
	var t = document.getElementsByClassName("circle");
	var u = document.getElementsByTagName("section");
	var v = document.getElementsByClassName("bpName");
	var w = document.getElementsByClassName("SubHeadings");
	var x = document.getElementsByClassName("Containers");
	var y = document.getElementsByTagName("h2");
	var z = document.getElementById("CoverText").getElementsByTagName("h1");

	/* Change the colour schemes according to selection */
	if (j == 1){
		console.log("Retro");
		Theme1.className = "active";
		/* First Section - Cover */
		document.getElementById("myTopnav").style.background = RetroCoverText1;
		document.getElementById("loadingMask").style.background = RetroBackground;
		document.getElementById("particles-js").style.background = RetroBackground;
		document.getElementById("CoverText").style.background = RetroCoverText;
		document.getElementById("VoteBox").style.background = RetroCoverText;
		document.getElementById("WinningPost").style.background = RetroCoverText;
		document.getElementById("WinningPost").className = "attentionRetro";
		//document.getElementById("EOSioCentral").style.background = RetroCoverText;
		document.getElementsByClassName("dropdownm-content")[0].style.background = RetroCoverText;
		var a;
		for (a = 0; a < l.length; a++) {l[a].style.backgroundImage = "url('oldSite/images/photo/background/3.jpg')";}
		for (a = 0; a < n.length; a++) {n[a].style.background = RetroPopup;}
		for (a = 0; a < o.length; a++) {o[a].style.background = RetroPopup;}
		for (a = 0; a < p.length; a++) {p[a].style.color = "white";}
		for (a = 0; a < q.length; a++) {q[a].style.color = "black";}
		for (a = 0; a < t.length; a++) {t[a].style.background = "orange";}
		if (Shade == "Colour") {
			for (a = 0; a < v.length; a++) {v[a].style.color = "#BC7439";}
			for (a = 0; a < z.length; a++) {z[a].style.color = "#BC7439";}
		}
		/* All Sections - Where all the links are */
		for (a = 0; a < u.length; a++) {u[a].style.background = RetroBackground;}
		/* Style all the Div, H2 & SubHeadings elements with classname Containers. */
		for (a = 0; a < x.length; a++) {
			x[a].style.background = RetroForground;
			x[a].style.boxShadow = RetroShadow;
		}
		for (a = 0; a < y.length; a++) {
			y[a].style.color = "white";
			y[a].style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
		}
		for (a = 0; a < w.length; a++) {
			w[a].style.color = "white";
			w[a].style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
		}
		/* Change the Footer */
		document.getElementById("footer").style.background = "#F2EFE2";
		/* Style the Owners Section */
		for (a = 0; a < r.length; a++) {
			r[a].style.color = "black";
		    r[a].style.borderColor = "black";
		    r[a].style.background = RetroBackground;
		  }
		  /* Change the Hardware Section */
		for (a = 0; a < s.length; a++) {s[a].style.borderColor = "white";}
		/* Close the NavBar */
		if (document.getElementById('myTopnav').className ==='topnav responsive') {myFunction()};
		/* Change the Logo between colour and pencil */
		if (Shade == "Colour"){
			newColor = RetroParticleColour;
			/* Change the Main Logo colours */
			for (a = 0; a < m.length; a++) {
				sec1 = (m[a]).src.substring(FilePathStart, FilePathEnd);
				sec2 = (m[a]).src.slice(FilePathEnd, );
				sec3 = "oldSite/images/logos/colour";
			    m[a].src = sec3 + sec2;
			  }
			document.getElementById('ArrowImg').src = "oldSite/images/icons/colour/orangeArrow.png";
			console.log("Retro Colour");
		} else if (Shade == "Pencil"){
			newColor = RetroParticlePencil;
			/* Change the Main Logo colours */
			for (a = 0; a < m.length; a++) {
				sec1 = (m[a]).src.substring(FilePathStart, FilePathEnd);
				sec2 = (m[a]).src.slice(FilePathEnd, );
				sec3 = "oldSite/images/logos/pencil";
			    m[a].src = sec3 + sec2;
			  }
			document.getElementById('ArrowImg').src = "oldSite/images/icons/pencil/orangeArrow.png";
			console.log("Retro Pencil");
		}
			/* Change the Particle Retro colours */
			pJSDom[0].pJS.particles.line_linked.color = newColor;
		    pJSDom[0].pJS.particles.line_linked.color_rgb_line = hexToRgb(newColor);
		    pJSDom[0].pJS.particles.line_linked.opacity = 1;
		    pJSDom[0].pJS.particles.shape.stroke.width = 2;
		    pJSDom[0].pJS.particles.shape.stroke.color = "#000000";
		    $.each(pJSDom[0].pJS.particles.array, function(i,p){
		      pJSDom[0].pJS.particles.array[i].color.value = newColor;
		      pJSDom[0].pJS.particles.array[i].color.rgb = hexToRgb(newColor);
		    });

		/* Keep track of current theme */
		CurrentTheme = "Retro";
	} 
	else if (j == 2){
		console.log("Dark");
		Theme2.className = "active";
		/* First Section - Cover */
		document.getElementById("myTopnav").style.background = DarkForground;
		document.getElementById("loadingMask").style.background = DarkBackground;
		document.getElementById("particles-js").style.background = DarkBackground;
		document.getElementById("CoverText").style.background = DarkBoxes;
		document.getElementById("VoteBox").style.background = DarkBoxes;
		document.getElementById("WinningPost").style.background = DarkBoxes;
		document.getElementById("WinningPost").className = "attentionDark";
		//document.getElementById("EOSioCentral").style.background = DarkBoxes;
		document.getElementsByClassName("dropdownm-content")[0].style.background = DarkForground;
		var a;
		for (a = 0; a < l.length; a++) {l[a].style.backgroundImage = "url('oldSite/images/photo/background/6.jpg')";}
		for (a = 0; a < n.length; a++) {n[a].style.background = DarkPopup;}
		for (a = 0; a < o.length; a++) {o[a].style.background = DarkPopup;}
		for (a = 0; a < p.length; a++) {p[a].style.color = "white";}
		for (a = 0; a < q.length; a++) {q[a].style.color = "black";}
		for (a = 0; a < t.length; a++) {t[a].style.background = "white";}
		if (Shade == "Colour") {
			for (a = 0; a < v.length; a++) {v[a].style.color = DarkBackground;}
			for (a = 0; a < z.length; a++) {z[a].style.color = DarkBackground;}
		}
		/* All Sections - Where all the links are */
		for (a = 0; a < u.length; a++) {u[a].style.background = DarkBackground;}
		/* Style all the Div, H2 & SubHeadings elements with classname Containers. */
		for (a = 0; a < x.length; a++) {
			x[a].style.background = DarkForground;
			x[a].style.boxShadow = DarkShadow;
		}
		for (a = 0; a < y.length; a++) {
			y[a].style.color = "white";
			y[a].style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
		}
		for (a = 0; a < w.length; a++) {
			w[a].style.color = "white";
			w[a].style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
		}
		/* Change the Footer */
		document.getElementById("footer").style.background = DarkForground;
		/* Style the Owners Section */
		for (a = 0; a < r.length; a++) {
		    r[a].style.background = DarkBackground;
		    r[a].style.color = "#000";
		    r[a].style.borderColor = "white";
		  }
		/* Change the Hardware Section */
		for (a = 0; a < s.length; a++) {s[a].style.borderColor = "black";}
		/* Close the NavBar */
		if (document.getElementById('myTopnav').className ==='topnav responsive') {myFunction()};
		
		/* Change the Particle Dark colours */
		if (Shade == "Colour"){
			newColor = DarkParticleColour;
			/* Change the Main Logo colours */
			for (a = 0; a < m.length; a++) {
				sec1 = (m[a]).src.substring(FilePathStart, FilePathEnd);
				sec2 = (m[a]).src.slice(FilePathEnd, );
				sec3 = "oldSite/images/logos/darklo";
			    m[a].src = sec3 + sec2;
			  }
			document.getElementById('ArrowImg').src = "oldSite/images/icons/colour/darkArrow.png";
			console.log("Dark Colour");

		} else if (Shade == "Pencil"){
			newColor = DarkParticlePencil;
			/* Change the Main Logo colours */
			for (a = 0; a < m.length; a++) {
				sec1 = (m[a]).src.substring(FilePathStart, FilePathEnd);
				sec2 = (m[a]).src.slice(FilePathEnd, );
				sec3 = "oldSite/images/logos/pencil";
			    m[a].src = sec3 + sec2;
			  }
			console.log("Dark Pencil");
			document.getElementById('ArrowImg').src = "oldSite/images/icons/pencil/darkArrow.png";
		}
			/* Change the Particle Dark colours */
			pJSDom[0].pJS.particles.line_linked.color = newColor;
		    pJSDom[0].pJS.particles.line_linked.color_rgb_line = hexToRgb(newColor);
		    pJSDom[0].pJS.particles.line_linked.opacity = 1;
		    pJSDom[0].pJS.particles.shape.stroke.color = "#FFFFFF";
		    $.each(pJSDom[0].pJS.particles.array, function(i,p){
		      pJSDom[0].pJS.particles.array[i].color.value = newColor;
		      pJSDom[0].pJS.particles.array[i].color.rgb = hexToRgb(newColor);
		    });

		/* Keep track of current theme */
		CurrentTheme = "Dark";
	} 
	else if (j == 3){
		console.log("Femine");
		Theme3.className = "active";

		/* First Section - Cover */
		document.getElementById("myTopnav").style.background = FemineForground;
		document.getElementById("loadingMask").style.background = FemineForground;
		document.getElementById("particles-js").style.background = FemineBackground;
		document.getElementById("CoverText").style.background = FemineBoxes;
        document.getElementById("VoteBox").style.background = FemineBoxes;
		document.getElementById("WinningPost").style.background = FemineBoxes;
		document.getElementById("WinningPost").className = "attentionFemine";
		//document.getElementById("EOSioCentral").style.background = FemineBoxes;
		document.getElementsByClassName("dropdownm-content")[0].style.background = FemineForground;
		var a;
		for (a = 0; a < l.length; a++) {l[a].style.backgroundImage = "url('oldSite/images/photo/background/1.jpg')";}
		for (a = 0; a < n.length; a++) {n[a].style.background = FeminePopup;}
		for (a = 0; a < o.length; a++) {o[a].style.background = FeminePopup;}
		for (a = 0; a < p.length; a++) {p[a].style.color = "white";}
		for (a = 0; a < q.length; a++) {q[a].style.color = "black";}
		for (a = 0; a < t.length; a++) {t[a].style.background = "pink";}
		if (Shade == "Colour") {
			for (a = 0; a < v.length; a++) {v[a].style.color = FemineBackground;}
			for (a = 0; a < z.length; a++) {z[a].style.color = FemineBackground;}
		}
		/* All Sections - Where all the links are */
		for (a = 0; a < u.length; a++) {u[a].style.background = FemineBackground;}
		/* Style all the Div, H2 & SubHeadings elements with classname Containers. */
		for (a = 0; a < x.length; a++) {
			x[a].style.background = FemineForground;
			x[a].style.boxShadow = FemineShadow;
		}
		for (a = 0; a < y.length; a++) {
			y[a].style.color = "white";
			y[a].style.textShadow = "-1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000";
		}
		for (a = 0; a < w.length; a++) {
			w[a].style.color = "white";
			w[a].style.textShadow = "-1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000";
		}
		/* Change the Footer */
		document.getElementById("footer").style.background = FemineForground;
		/* Style the Owners Section */
		for (a = 0; a < r.length; a++) {
		    r[a].style.background = FemineBackground;
		    r[a].style.color = "#CCC";
		    r[a].style.borderColor = "white";
		  }
		/* Change the Hardware Section */
		for (a = 0; a < s.length; a++) {s[a].style.borderColor = "black";}
		/* Close the NavBar */
		if (document.getElementById('myTopnav').className ==='topnav responsive') {myFunction()};
		
		/* Change the Particle Femine colours */
		if (Shade == "Colour"){
			newColor = FemineParticleColour;
			/* Change the Main Logo colours */
			for (a = 0; a < m.length; a++) {
				sec1 = (m[a]).src.substring(FilePathStart, FilePathEnd);
				sec2 = (m[a]).src.slice(FilePathEnd, );
				sec3 = "oldSite/images/logos/femine";
			    m[a].src = sec3 + sec2;
			  }
			document.getElementById('ArrowImg').src = "oldSite/images/icons/colour/softArrow.png";
			console.log("Femine Colour");
		} else if (Shade == "Pencil"){
			newColor = FemineParticlePencil;
			/* Change the Main Logo colours */
			for (a = 0; a < m.length; a++) {
				sec1 = (m[a]).src.substring(FilePathStart, FilePathEnd);
				sec2 = (m[a]).src.slice(FilePathEnd, );
				sec3 = "oldSite/images/logos/pencil";
			    m[a].src = sec3 + sec2;
			  }
			document.getElementById('ArrowImg').src = "oldSite/images/icons/pencil/softArrow.png";
			console.log("Femine Pencil");
		}
			/* Change the Particle Femine colours */
			pJSDom[0].pJS.particles.line_linked.color = newColor;
		    pJSDom[0].pJS.particles.line_linked.color_rgb_line = hexToRgb(newColor);
		    pJSDom[0].pJS.particles.line_linked.opacity = 1;
		    pJSDom[0].pJS.particles.shape.stroke.color = "#FF6666";
		    $.each(pJSDom[0].pJS.particles.array, function(i,p){
		      pJSDom[0].pJS.particles.array[i].color.value = newColor;
		      pJSDom[0].pJS.particles.array[i].color.rgb = hexToRgb(newColor);
		    });

		/* Keep track of current theme */
		CurrentTheme = "Femine";
	}
}

function Pencil(i){
	var PencilVar = document.getElementById("Pencil");
	var ColourVar = document.getElementById("Colour");
	PencilVar.className = ColourVar.className = "topnav a";

	var r = document.getElementById("ArrowImg");
	var s = document.getElementsByClassName("bpName");
	var t = document.getElementById("CoverText").getElementsByTagName("h1");
	var u = document.getElementsByClassName("photos");
	var v = document.getElementsByClassName("popupboxImg");
	var w = document.getElementsByClassName("popupboxImgLink");
	var ww = document.getElementsByClassName("mobileLink");
	var x = document.getElementsByClassName("icons");
	var y = document.getElementsByClassName("SIcons");
	var z = document.getElementsByClassName("TCentralLogo");
	var a;

	/* If Pencil is Selected */
	if (i == 1){
		/* Change the CoverText H1 & BPName colours */
		for (a = 0; a < s.length; a++) {s[a].style.color = "grey";}
		for (a = 0; a < t.length; a++) {t[a].style.color = "grey";}
		/* Change the CoverText H1, BPName & Particle colours */
		if (CurrentTheme == "Retro"){
			console.log("Pencil Retro");
			/* Change the Particle Retro colours */
			newColor = RetroParticlePencil;
			/* Change the arrow for Retro */
			r.src = "oldSite/images/icons/pencil/orangeArrow.png";
		} else if (CurrentTheme == "Dark"){
			console.log("Pencil Dark");
			/* Change the Particle Dark colours */
			newColor = DarkParticlePencil;
			/* Change the arrow for Dark */
			r.src = "oldSite/images/icons/pencil/darkArrow.png";
		} else if (CurrentTheme == "Femine"){
			console.log("Pencil Femine");
			/* Change the Particle Femine colours */
			newColor = FemineParticlePencil;
			/* Change the arrow for Soft */
			r.src = "oldSite/images/icons/pencil/softArrow.png";
		}
			/* Change the Particle Femine colours */
			pJSDom[0].pJS.particles.line_linked.color = newColor;
		    pJSDom[0].pJS.particles.line_linked.color_rgb_line = hexToRgb(newColor);
		    pJSDom[0].pJS.particles.line_linked.opacity = 1;
		    $.each(pJSDom[0].pJS.particles.array, function(i,p){
		      pJSDom[0].pJS.particles.array[i].color.value = newColor;
		      pJSDom[0].pJS.particles.array[i].color.rgb = hexToRgb(newColor);
			});

		for (a = 0; a < u.length; a++) {
			sec1 = (u[a]).src.substring(FilePathStart, FilePathEnd);
			sec2 = (u[a]).src.slice(FilePathEnd, );
			sec3 = "oldSite/images/photo/pencil";
		    u[a].src = sec3 + sec2;
		  }
		for (a = 0; a < v.length; a++) {
			sec1 = (v[a]).src.substring(FilePathStart, FilePathEnd);
			sec2 = (v[a]).src.slice(FilePathEnd, );
			sec3 = "oldSite/images/other/pencil";
		    v[a].src = sec3 + sec2;
		  }
		for (a = 0; a < w.length; a++) {
			sec1 = (w[a]).src.substring(FilePathStart, FilePathEnd);
			sec2 = (w[a]).src.slice(FilePathEnd, );
			sec3 = "oldSite/images/icons/pencil";
		    w[a].src = sec3 + sec2;
		  }
		  for (a = 0; a < ww.length; a++) {
			sec1 = (ww[a]).src.substring(FilePathStart, FilePathEnd);
			sec2 = (ww[a]).src.slice(FilePathEnd, );
			sec3 = "oldSite/images/icons/pencil";
		    ww[a].src = sec3 + sec2;
		  }
		for (a = 0; a < x.length; a++) {
			sec1 = (x[a]).src.substring(FilePathStart, FilePathEnd);
			sec2 = (x[a]).src.slice(FilePathEnd, );
			sec3 = "oldSite/images/icons/pencil";
		    x[a].src = sec3 + sec2;
		  }
		for (a = 0; a < y.length; a++) {
			sec1 = (y[a]).src.substring(FilePathStart, FilePathEnd);
			sec2 = (y[a]).src.slice(FilePathEnd, );
			sec3 = "oldSite/images/icons/pencil";
		    y[a].src = sec3 + sec2;
		  }
		for (a = 0; a < z.length; a++) {
			sec1 = (z[a]).src.substring(FilePathStart, FilePathEnd);
			sec2 = (z[a]).src.slice(FilePathEnd, );
			sec3 = "oldSite/images/logos/pencil";
		    z[a].src = sec3 + sec2;
		  }
		  document.getElementById("footericon").src = "oldSite/images/icons/pencil/growth.png";
		  Shade = "Pencil";
		  PencilVar.className = "active";

	/* If Colour is Selected */
	}else if (i == 2){
		/* Change the CoverText H1, BPName & Particle colours */
		if (CurrentTheme == "Retro"){
			console.log("Colour Retro");
			for (a = 0; a < s.length; a++) {s[a].style.color = "#BC7439";}
			for (a = 0; a < t.length; a++) {t[a].style.color = "#BC7439";}
			/* Change the Particle Retro colours */
			newColor = RetroParticleColour;
			/* Change the Main Logo colours */
			for (a = 0; a < z.length; a++) {
				sec1 = (z[a]).src.substring(FilePathStart, FilePathEnd);
				sec2 = (z[a]).src.slice(FilePathEnd, );
				sec3 = "oldSite/images/logos/colour";
			    z[a].src = sec3 + sec2;
			  }
			console.log(sec1);
			console.log(sec2);
			console.log(sec3);
			/* Change the arrow for Retro */
			console.log("orangeArrow");
			r.src = "oldSite/images/icons/colour/orangeArrow.png";
		} else if (CurrentTheme == "Dark"){
			console.log("Colour Dark");
			for (a = 0; a < s.length; a++) {s[a].style.color = DarkBackground;}
			for (a = 0; a < t.length; a++) {t[a].style.color = DarkBackground;}
			/* Change the Particle Dark colours */
			newColor = DarkParticleColour;
			/* Change the Main Logo colours */
			for (a = 0; a < z.length; a++) {
				sec1 = (z[a]).src.substring(FilePathStart, FilePathEnd);
				sec2 = (z[a]).src.slice(FilePathEnd, );
				sec3 = "oldSite/images/logos/darklo";
			    z[a].src = sec3 + sec2;
			  }
			/* Change the arrow for Dark */
			console.log("darkArrow");
			r.src = "oldSite/images/icons/colour/darkArrow.png";
		} else if (CurrentTheme == "Femine"){
			console.log("Colour Femine");
			for (a = 0; a < s.length; a++) {s[a].style.color = FemineBackground;}
			for (a = 0; a < t.length; a++) {t[a].style.color = FemineBackground;}
			/* Change the Particle Femine colours */
			newColor = FemineParticleColour;
			/* Change the Main Logo colours */
			for (a = 0; a < z.length; a++) {
				sec1 = (z[a]).src.substring(FilePathStart, FilePathEnd);
				sec2 = (z[a]).src.slice(FilePathEnd, );
				sec3 = "oldSite/images/logos/femine";
			    z[a].src = sec3 + sec2;
			  }
			/* Change the arrow for Soft */
			console.log("softArrow");
			r.src = "oldSite/images/icons/colour/softArrow.png";
		}
			/* Change the Particle Femine colours */
			pJSDom[0].pJS.particles.line_linked.color = newColor;
		    pJSDom[0].pJS.particles.line_linked.color_rgb_line = hexToRgb(newColor);
		    pJSDom[0].pJS.particles.line_linked.opacity = 1;
		    $.each(pJSDom[0].pJS.particles.array, function(i,p){
		      pJSDom[0].pJS.particles.array[i].color.value = newColor;
		      pJSDom[0].pJS.particles.array[i].color.rgb = hexToRgb(newColor);
			});

			for (a = 0; a < u.length; a++) {
				sec1 = (u[a]).src.substring(FilePathStart, FilePathEnd);
				sec2 = (u[a]).src.slice(FilePathEnd, );
				sec3 = "oldSite/images/photo/colour";
			    u[a].src = sec3 + sec2;
			  }
			for (a = 0; a < v.length; a++) {
				sec1 = (v[a]).src.substring(FilePathStart, FilePathEnd);
				sec2 = (v[a]).src.slice(FilePathEnd, );
				sec3 = "oldSite/images/other/colour";
			    v[a].src = sec3 + sec2;
			  }
			for (a = 0; a < w.length; a++) {
				sec1 = (w[a]).src.substring(FilePathStart, FilePathEnd);
				sec2 = (w[a]).src.slice(FilePathEnd, );
				sec3 = "oldSite/images/icons/colour";
			    w[a].src = sec3 + sec2;
			  }
			  for (a = 0; a < ww.length; a++) {
				sec1 = (ww[a]).src.substring(FilePathStart, FilePathEnd);
				sec2 = (ww[a]).src.slice(FilePathEnd, );
				sec3 = "oldSite/images/icons/colour";
			    ww[a].src = sec3 + sec2;
			  }
			for (a = 0; a < x.length; a++) {
				sec1 = (x[a]).src.substring(FilePathStart, FilePathEnd);
				sec2 = (x[a]).src.slice(FilePathEnd, );
				sec3 = "oldSite/images/icons/colour";
			    x[a].src = sec3 + sec2;
			  }
			  for (a = 0; a < y.length; a++) {
				sec1 = (y[a]).src.substring(FilePathStart, FilePathEnd);
				sec2 = (y[a]).src.slice(FilePathEnd, );
				sec3 = "oldSite/images/icons/colour";
			    y[a].src = sec3 + sec2;
			  }

			  document.getElementById("footericon").src = "oldSite/images/icons/colour/growth.png";
			  Shade = "Colour";
			  ColourVar.className = "active";
		}
	}

// Make an acordion link slide-down with all the BP links.
function accordionClick(i){
    var acc = document.getElementsByClassName("accordion");

        acc[i].classList.toggle("activeDD");

        /* Toggle between hiding and showing the active panel */
        var panel = acc[i].nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }

}

// Function to check the screen width and change all the info box class names from left or right to bottom if the viewport is small like a mobile phone.
function phoneViewPort(){
    if(window.innerWidth < 500)
    {
        var classNo1 = document.getElementsByClassName("popupboxleft");
        var classNo2 = document.getElementsByClassName("popupboxlefttext");
        for(var i = classNo1.length-1; i >= 0; i--){
            classNo1[i].className = "popupboxbottom";
            classNo2[i].className = "popupboxbottomtext";
        }
        
        var classNo3 = document.getElementsByClassName("popupboxright");
        var classNo4 = document.getElementsByClassName("popupboxrighttext");
        for(var j = classNo3.length-1; j >= 0; j--){
            classNo3[j].className = "popupboxbottom";
            classNo4[j].className = "popupboxbottomtext";
        }
    }
    else
    {
        console.log("Viewport Width: " + window.innerWidth);
    }
}

// Function to close the tooltip if in mobile mode
/*function closeToolTip(a){
    if(window.innerWidth < 500)
    {
        classToolTip1 = document.getElementsByClassName("popupboxbottomtext");
        if(a == 1)
        {
            for(var i = classToolTip1.length-1; i >= 0; i--){
                classToolTip1[i].style.visibility = "visible";
            }
        }
        else if(a == 0)
        {
            for(var i = classToolTip1.length-1; i >= 0; i--){
                classToolTip1[i].style.visibility = "hidden";
            }
        }
        
    }
}*/
