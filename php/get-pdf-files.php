<?php
$dir =  '/media/files';

$files = array();
foreach (glob('/media/files/*', SCANDIR_SORT_ASCENDING) as $file) {
	$files[] = basename($file);
}
sort($files);

echo json_encode($files);
