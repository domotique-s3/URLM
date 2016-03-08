/*global $:false */
/*jshint camelcase: false */
/*jslint devel: true */
/*jshint -W031 */
/*global
    CookieManager, Clipboard, QueryMaker
*/

function PageBuilder() {
    "use strict";
    var cookiesToGet = [
        "maker_value-column-input",
        "maker_sensor-column-input",
        "maker_timestamp-column-input",
        "maker_date-start-input",
        "maker_date-end-input"
    ],
        dbCharts_path = '',
        insertAfter_newSensor = function (appendIn) {
            $.get('template/newSensor.html', function (data) {
                $(data).insertAfter(appendIn);
                var remove_sensor = $('.remove-sensor');
                remove_sensor.off();
                remove_sensor.click(function () {
                    $(this).parent().parent().remove();
                });
            });
        },
        addEvent_addSensor = function () {
            var add_sensor = $('.add-sensor');
            add_sensor.off();
            add_sensor.click(function () {
                insertAfter_newSensor($(this).parent().parent());
                $('[data-toggle="tooltip"]').tooltip();
            });
        },
        insertAfter_newTable = function () {
            $.get('template/newTable.html', function (data) {
                $(data).insertAfter($('.bg-info').last());
                var remove_table = $('.remove-table');
                remove_table.off();
                remove_table.click(function () {
                    $(this).parent().parent().parent().remove();
                });
                addEvent_addSensor();
            });
        },

        initialize_dbChartsPath = function () {

            $.get('config.json', function(data) {
                dbCharts_path = data.path;
            }).fail(function (err) {
                if (err.status === 404) {
                    throw new Error("Config not found");
                }
                throw new Error("An error occurred");
            });
        },

        initialize_inputFromCookies = function () {
            var cookies = new CookieManager().getCookies(cookiesToGet);
            $.each(cookies, function (index, val) {
                $("#" + index).val(val);
            });
        },
        addEvent_addTable = function () {
            var add_table = $('.add-table');
            add_table.off();
            add_table.click(function () {
                insertAfter_newTable();
                $('[data-toggle="tooltip"]').tooltip();
            });
        },

        addEvent_validate = function () {
            $('#maker_validate').click(function () {
                var qm = new QueryMaker(), cookies = [];
                qm.init();

                $('#maker_url').text(dbCharts_path + "?" + qm.getURL());
                $(cookiesToGet).each(function () {
                    cookies.push({"name": this, "value": $("#" + this).val(), "lifetime": 7});
                });
                new CookieManager().setCookies(cookies);
                $('#chart_iframe').attr('src', dbCharts_path + '?' + qm.getURL());
                var clipboard = new Clipboard('#maker_validate');
            });
        },
        addEvent_datetimepicker = function () {
            var dpstart = $('#datetimepicker_start'),
                dpend = $('#datetimepicker_end');
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
        },
        addEvent_selectInputText = function () {
            $('input').click(function () {
                $(this).select();
            });
        };


    this.init = function () {
        $.ajaxSetup({async:false, cache: false});
        addEvent_addSensor();
        addEvent_addTable();
        addEvent_datetimepicker();
        addEvent_validate();
        initialize_inputFromCookies();
        initialize_dbChartsPath();
        addEvent_selectInputText();
        $('[data-toggle="tooltip"]').tooltip();
    };

}