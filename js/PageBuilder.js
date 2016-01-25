function PageBuilder() {

    var cookiesToGet = [
        "maker_value-column-input",
        "maker_sensor-column-input",
        "maker_timestamp-column-input",
        "maker_date-start-input",
        "maker_date-end-input"
    ];

    this.init = function () {
        addEvent_addSensor();
        addEvent_addTable();
        addEvent_datetimepicker();
        addEvent_validate();
        initialize_inputFromCookies();
        addEvent_selectInputText();
        $('[data-toggle="tooltip"]').tooltip();
        new Clipboard('#maker_validate');

    };

    var addEvent_addSensor = function () {
        var add_sensor = $('.add-sensor');
        add_sensor.off();
        add_sensor.click(function () {
            insertAfter_newSensor($(this).parent().parent());
            $('[data-toggle="tooltip"]').tooltip();
        });
    };

    var addEvent_addTable = function () {
	    var add_table = $('.add-table');
        add_table.off();
        add_table.click(function () {
            insertAfter_newTable();
            $('[data-toggle="tooltip"]').tooltip();
        });
    };

    var addEvent_validate = function () {
        $('#maker_validate').click(function () {
            var qm = new QueryMaker();
            qm.init();

            $('#maker_url').text(qm.getURL());

            var cookies = [];
            $.each(cookiesToGet, function(index, val) {
                cookies.push({"name": val, "value": $("#" + val).val(), "lifetime": 7});
            });
            new CookieManager().setCookies(cookies);
        })
    };

    var addEvent_datetimepicker = function () {
	    var dpstart = $('#datetimepicker_start');
	    var dpend = $('#datetimepicker_end');
        dpstart.datetimepicker({
            locale: 'fr'
        });
        dpend.datetimepicker({
            locale: 'fr',
            useCurrent: false
        });

        dpstart.on("dp.change", function (e) {
            $('#maker_date-start-input').val(e.date.format('X') + '.000');
            $('#datetimepicker_end').data("DateTimePicker").minDate(e.date);
        });
        dpend.on("dp.change dp.click", function (e) {
            $('#maker_date-end-input').val(e.date.format('X') + '.000');
            $('#datetimepicker_start').data("DateTimePicker").maxDate(e.date);
        });
    };

    var addEvent_selectInputText = function () {
        $('input').click(function () {
            $(this).select();
        })
    };

    var insertAfter_newSensor = function (appendIn) {
	    var remove_sensor = $('.remove-sensor');
        $.get('../template/newSensor.html', function(data) {
            $(data).insertAfter(appendIn);
            remove_sensor.off();
            remove_sensor.click(function() {
                $(this).parent().parent().remove();
            });
        });
    };

    var insertAfter_newTable = function () {
	    var remove_table = $('.remove-table');
        $.get('../template/newTable.html', function(data) {
            $(data).insertAfter($('.bg-info').last());
            remove_table.off();
            remove_table.click(function() {
                $(this).parent().parent().parent().remove();
            });
            addEvent_addSensor();
        });
    };

    var initialize_inputFromCookies = function () {
        var cookies = new CookieManager().getCookies(cookiesToGet);
        $.each(cookies, function (index, val) {
            $("#" + index).val(val);
        });
    };


}