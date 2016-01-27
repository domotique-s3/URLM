/*global $:false */
/*jslint browser:true */
/*jslint regexp: true */
function CookieManager() {
    "use strict";
    this.getCookie = function (name) {
        var cookiestring = new RegExp(name + "[^;]+").exec(document.cookie);
        return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
    };

    this.getCookies = function (names) {
        var i, result = {};
        for (i = 0; i < names.length; i = i + 1) {
            result[names[i]] = this.getCookie(names[i]);
        }
        return result;
    };

    this.setCookie = function (name, value, lifeTime) {
        if (value.trim() !== "") {
            document.cookie = name + "=" + value + "; expires=" + new Date().addDays(lifeTime);
        }
    };

    this.setCookies = function (object) {
        var self = this;
        $.each(object, function (val) {
            self.setCookie(val.name, val.value, val.lifetime);
        });
    };
}