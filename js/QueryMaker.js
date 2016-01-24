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
	}

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
			};
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

		var shallowDecoded = decodeURIComponent($.param(result2));

		return shallowDecoded;


	}

	/**
	 * Catch column name (value, sensor, timestamp)
	 */
	var findColumnName = function () {
		if($('#maker_value-column-input').val().trim() == ""){
			$('#maker_value-column-input').parent().parent().addClass('has-error');
		}
		if($('#maker_sensor-column-input').val().trim() == ""){
			$('#maker_sensor-column-input').parent().parent().addClass('has-error');
		}
		if($('#maker_timestamp-column-input').val().trim() == ""){
			$('#maker_timestamp-column-input').parent().parent().addClass('has-error');
		}
			columnName.valuesColumn = $('#maker_value-column-input').val();
			columnName.sensorIdColumn = $('#maker_sensor-column-input').val();
			columnName.timestampColumn = $('#maker_timestamp-column-input').val();
	}

	/**
	 * Catch all sensors associated to their table
	 */
	var findTableWithSensors = function () {
		$.each($('.bg-info'), function(index, table) {
			tableWithSensors[$(table).find('#maker_table-name-input').val()] = []
			$.each($(table).find('.maker_sensor'), function(index, sensor) {
				tableWithSensors[$(table).find('#maker_table-name-input').val()].push({
					id : $(sensor).find('.maker_sensor-input').val(),
					type : $(sensor).find('.maker_sensor-select').val()
				});
			});
		});
	}

	/**
	 * Catch timestamp Start and End value
	 */
	var findTimestamp = function () {
		if($('#maker_date-start-input').val().trim() == ""){
			$('#maker_date-start-input').parent().parent().addClass('has-error');
		}
		if($('#maker_date-end-input').val().trim() == ""){
			$('#maker_date-end-input').parent().parent().addClass('has-error');
		}
		timestamp.startTime = $('#maker_date-start-input').val();
		timestamp.endTime = $('#maker_date-end-input').val();
	}
}