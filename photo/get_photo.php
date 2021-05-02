<?php
$dir = $_SERVER['DOCUMENT_ROOT'] . '/media/photo/*';

$files = array();
foreach (glob($dir, SCANDIR_SORT_ASCENDING) as $file) {
	$files[] = basename($file);
}
// natcasesort($files);
