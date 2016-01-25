function QueryMaker () {
	
	var tableWithSensors = {};
	var columnName = {};
	var timestamp = {};

	/**
	 * Initialize this class
	 */
	this.init = function () {
		$('.form-group').removeClass('has-error');
		findTableWithSensors();
		findColumnName();
		findTimestamp();
		console.log(columnName);
		console.log(tableWithSensors);
		console.log(timestamp);
	};

	/**
	 * Construct and return URL
	 */
	this.getURL = function (){
		var result = '';

		var result2 = {};

		var sensors = "sensors=";
		result2.sensors = {};
		$.each(tableWithSensors, function(index, val) {
			sensors += index + '[';
			result2.sensors[index] = [];
			for (var i = 0; i < val.length; i++) {
				result2.sensors[index].push(val[i].id);
				sensors += val[i].id;
				if(i != (val.length - 1))
					sensors += ',';
			}
			sensors += ']';
		});
		result += sensors + '&';

		$.each(columnName, function(index, val) {
			result2[index] = val;
			result += index + '=' + val + '&';
		});
		$.each(timestamp, function(index, val) {
			result2[index] = val;
			result += index + '=' + val + '&';
		});

		return decodeURIComponent($.param(result2));

	};

	/**
	 * Catch column name (value, sensor, timestamp)
	 */
	var findColumnName = function () {
		var maker_value = $('#maker_value-column-input');
		var maker_sensor = $('#maker_sensor-column-input');
		var maker_timestamp = $('#maker_timestamp-column-input');
		if(maker_value.val().trim() == ""){
			maker_value.parent().parent().addClass('has-error');
		}
		if(maker_sensor.val().trim() == ""){
			maker_sensor.parent().parent().addClass('has-error');
		}
		if(maker_timestamp.val().trim() == ""){
			maker_timestamp.parent().parent().addClass('has-error');
		}
			columnName.valuesColumn = maker_value.val();
			columnName.sensorIdColumn = maker_sensor.val();
			columnName.timestampColumn = maker_timestamp.val();
	};

	/**
	 * Catch all sensors associated to their table
	 */
	var findTableWithSensors = function () {
		$.each($('.bg-info'), function(index, table) {
			tableWithSensors[$(table).find('#maker_table-name-input').val()] = [];
			$.each($(table).find('.maker_sensor'), function(index, sensor) {
				tableWithSensors[$(table).find('#maker_table-name-input').val()].push({
					id : $(sensor).find('.maker_sensor-input').val(),
					type : $(sensor).find('.maker_sensor-select').val()
				});
			});
		});
	};

	/**
	 * Catch timestamp Start and End value
	 */
	var findTimestamp = function () {
		var date_start = $('#maker_date-start-input');
		var date_end = $('#maker_date-end-input');
		if(date_start.val().trim() == ""){
			date_start.parent().parent().addClass('has-error');
		}
		if(date_end.val().trim() == ""){
			date_end.parent().parent().addClass('has-error');
		}
		timestamp.startTime = date_start.val();
		timestamp.endTime = date_end.val();
	}
}