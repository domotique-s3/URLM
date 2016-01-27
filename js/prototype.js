Object.defineProperty(Date.prototype, "addDays",
    {
        value: function (days) {
            "use strict";
            var dat = new Date(this.valueOf());
            dat.setDate(dat.getDate() + days);
            return dat;
        }
    });