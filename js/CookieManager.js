function CookieManager () {

	this.getCookie = function (name){
		var cookiestring = new RegExp("" + name + "[^;]+").exec(document.cookie);
	 	return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "")
	};

	this.getCookies = function (names){
		var result = {};
		for(var i = 0; i< names.length; i++){
			result[names[i]] = this.getCookie(names[i]);
		}
		return result;
	};

	this.setCookie = function (name, value, lifeTime){
		if(value.trim() != ""){
			document.cookie = name + "=" + value + "; expires=" + new Date().addDays(lifeTime);
		}
	};

	this.setCookies = function(object){
        var self = this;
		$.each(object, function(index, val) {
			self.setCookie(val.name, val.value, val.lifetime);
		});
	}
}