<?php

$scandir = __DIR__ . '/media/';

// Run the recursive function
// This function scans the files folder recursively, and builds a large array

$scan = function ($dir) use ($scandir, &$scan) {
	$files = [];

	// Is there actually such a folder/file?

	if (file_exists($dir)) {
		foreach (scandir($dir) as $f) {
			if (! $f || $f[0] == '.') {
				continue; // Ignore hidden files
			}

			if (is_dir($dir . '/' . $f)) {
				// The path is a folder

				$files[] = [
					'name'  => $f,
					'type'  => 'folder',
					'path'  => str_replace($scandir, '', $dir) . '/' . $f,
					'items' => $scan($dir . '/' . $f), // Recursively get the contents of the folder
				];
			} else {
				// It is a file

				$files[] = [
					'name' => $f,
					'type' => 'file',
					'path' => str_replace($scandir, '', $dir) . '/' . $f,
					'size' => filesize($dir . '/' . $f), // Gets the size of this file
				];
			}
		}
	}

	return $files;
};

$response = $scan($scandir);

// Output the directory listing as JSON

header('Content-type: application/json');

echo json_encode([
	'name'  => '',
	'type'  => 'folder',
	'path'  => '',
	'items' => $response,
]);
