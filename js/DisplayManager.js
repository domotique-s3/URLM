function DisplayManager(){
	this.display_messagebox = function(title, text){
		$("#messagebox_title").text(title);
		$("#messagebox_text").text(text);
		$("#messagebox").show();
	}
}