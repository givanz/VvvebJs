<?php
/*
Copyright 2017 Ziadin Givan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

https://github.com/givanz/VvvebJs
*/

//scan media folder for all files to display in media modal

if (isset($_POST['mediaPath'])) {
	define('UPLOAD_PATH', $_POST['mediaPath']);
} else {
	define('UPLOAD_PATH', 'media');
}

$scandir = __DIR__ . '/' . UPLOAD_PATH;

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
