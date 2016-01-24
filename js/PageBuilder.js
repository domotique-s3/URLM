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
        $('[data-toggle="tooltip"]').tooltip()
        new Clipboard('#maker_validate');

    };

    var addEvent_addSensor = function () {
        $('.add-sensor').off();
        $('.add-sensor').click(function (event) {
            insertAfter_newSensor($(this).parent().parent());
            $('[data-toggle="tooltip"]').tooltip();
        });
    };

    var addEvent_addTable = function () {
        $('.add-table').off();
        $('.add-table').click(function (event) {
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
        $('#datetimepicker_start').datetimepicker({
            locale: 'fr'
        });
        $('#datetimepicker_end').datetimepicker({
            locale: 'fr',
            useCurrent: false
        });

        $("#datetimepicker_start").on("dp.change", function (e) {
            $('#maker_date-start-input').val(e.date.format('X') + '.000');
            $('#datetimepicker_end').data("DateTimePicker").minDate(e.date);
        });
        $("#datetimepicker_end").on("dp.change dp.click", function (e) {
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
        $.get('../template/newSensor.html', function(data) {
            $(data).insertAfter(appendIn);
            $('.remove-sensor').off();
            $('.remove-sensor').click(function(event) {
                $(this).parent().parent().remove();
            });
        });
    };

    var insertAfter_newTable = function () {
        $.get('../template/newTable.html', function(data) {
            $(data).insertAfter($('.bg-info').last());
            $('.remove-table').off();
            $('.remove-table').click(function(event) {
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