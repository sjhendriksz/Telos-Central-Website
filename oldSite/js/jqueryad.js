$(document).ready(function(){
    $(".holders").click(function(){
    	console.log($(this).width());
    	console.log($(this).height());
    	if ($(this).width() < "200") {
    		console.log(this.width)
    		$(this).animate({
	    		position: "absolute",
	        	height: "80vh",
	        	width: "95vw"
	        });
	        $(this).find(".desc").show();
    	}else{
    		console.log("else")
    		$(this).animate({
	    		position: "static",
	        	width: "200px",
				height: "280px"
	        });
	        $(this).find(".desc").hide();
    	}
    });
});