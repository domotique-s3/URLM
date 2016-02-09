<?php

	print("--- DBCHARTS SETUP --- \n\n");

	print("\nEnter the path to dbCharts : ");

	if (PHP_OS == 'WINNT') {
		$path = stream_get_line(STDIN, 1024, PHP_EOL);
	} else {
		$path = readline();
	}

	$toPrint = array('path' => $path);


	if(is_file("config.json")){
		unlink("config.json");
	}

	$file = fopen('config.json', 'w');
	fwrite($file, json_encode($toPrint));



?>