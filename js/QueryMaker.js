/*global $:false */
/*jshint camelcase: false */
/*jslint devel: true */
function QueryMaker() {
    "use strict";
    var tableWithSensors = {}, columnName = {}, timestamp = {};

    /**
     * Construct and return URL
     */
    this.getURL = function () {
        /*var result = '', */
        var result2 = {}, /*sensors = "sensors=",*/ i = 0;
        result2.sensors = {};
        $.each(tableWithSensors, function (index, val) {
            //sensors += index + '[';
            result2.sensors[index] = [];
            for (i = 0; i < val.length; i = i + 1) {
                result2.sensors[index].push(val[i].id + '_' + val[i].type);
                /*sensors += val[i].id;
                if (i !== val.length - 1) {
                    sensors += ',';
                }*/
            }
            //sensors += ']';
        });
        //result += sensors + '&';

        $.each(columnName, function (index, val) {
            result2[index] = val;
            //result += index + '=' + val + '&';
        });
        $.each(timestamp, function (index, val) {
            result2[index] = val;
            //result += index + '=' + val + '&';
        });

        return decodeURIComponent($.param(result2));
    };

    /**
     * Catch column name (value, sensor, timestamp)
     */
    var findColumnName = function () {
        var maker_value = $('#maker_value-column-input'),
            maker_sensor = $('#maker_sensor-column-input'),
            maker_timestamp = $('#maker_timestamp-column-input');
        if (maker_value.val().trim() === "") {
            maker_value.parent().parent().addClass('has-error');
        }
        if (maker_sensor.val().trim() === "") {
            maker_sensor.parent().parent().addClass('has-error');
        }
        if (maker_timestamp.val().trim() === "") {
            maker_timestamp.parent().parent().addClass('has-error');
        }
        columnName.valuesColumn = maker_value.val();
        columnName.sensorIdColumn = maker_sensor.val();
        columnName.timestampColumn = maker_timestamp.val();
    },

    /**
     * Catch all sensors associated to their table
     */
        findTableWithSensors = function () {
            var type = '', id, tableName;
            $('.bg-info').each(function(a, table) {
                tableName = $(table).find('#maker_table-name-input').val()

                tableWithSensors[tableName] = [];

                $($(table).find('.maker_sensor')).each(function(b, sensor) {
                    
                    if($(sensor).find('.maker_sensor-input').val().trim() !== ""){
                        id = $(sensor).find('.maker_sensor-input').val();
                        if($(sensor).find('.maker_sensor-select').val() === 'default'){
                            type = 'l';
                        }
                        type = $(sensor).find('.maker_sensor-select').val();

                        tableWithSensors[tableName].push({
                            'id' : id,
                            'type' : type
                        });
                    }
                });
            });
        },

    /**
     * Catch timestamp Start and End value
     */
        findTimestamp = function () {
            var date_start = $('#maker_date-start-input'),
                date_end = $('#maker_date-end-input');
            if (date_start.val().trim() === "") {
                date_start.parent().parent().addClass('has-warning');
            } else {
                timestamp.start = date_start.val();
            }
            if (date_end.val().trim() === "") {
                date_end.parent().parent().addClass('has-warning');
            } else {
                timestamp.end = date_end.val();
            }
        };

    /**
     * Initialize this class
     */
    this.init = function () {
        $('.has-error').removeClass('has-error');
        $('.has-warning').removeClass('has-warning');
        findTableWithSensors();
        findColumnName();
        findTimestamp();
        /*console.log(columnName);
        console.log(tableWithSensors);
        console.log(timestamp);
        */
    };
}