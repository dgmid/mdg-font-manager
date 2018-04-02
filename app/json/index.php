#!/usr/bin/php
<?php

$filepath = realpath( '../../dist/json/' );

$string = file_get_contents( "https://google-webfonts-helper.herokuapp.com/api/fonts" );
$json = json_decode( $string, true );

array_multisort( $json );
$length = sizeof( $json );
$count = 0;

$file = fopen( $filepath."/google-font-list.json", "w") or die("fopen error" );
fwrite( $file, "[\n" );

foreach( $json as $array ) {

	fwrite( $file, "\t{ \"id\": \"".$array['id']."\", \"name\": \"".$array['family']."\" }" );
	
	$count++;
	
	if( $length !== $count ) {
		
		fwrite( $file, ",\n" );
	
	}
}

fwrite( $file, "\n]\n" );
fclose( $file );

?>
