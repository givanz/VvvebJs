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

define('MAX_FILE_LIMIT', 1024 * 1024 * 2);//2 Megabytes max html file size
define('ALLOW_PHP', false);//check if saved html contains php tag and don't save if not allowed
define('ALLOWED_OEMBED_DOMAINS', [
	'https://www.youtube.com/', 
	'https://www.vimeo.com/', 
	'https://www.twitter.com/'
]);//load urls only from allowed websites for oembed

function sanitizeFileName($file, $allowedExtension = 'html') {
	$basename = basename($file);
	$disallow = ['.htaccess', 'passwd'];
	if (in_array($basename, $disallow)) {
		showError('Filename not allowed!');
		return '';
	}
	
	//sanitize, remove double dot .. and remove get parameters if any
	$file = preg_replace('@\?.*$@' , '', preg_replace('@\.{2,}@' , '', preg_replace('@[^\/\\a-zA-Z0-9\-\._]@', '', $file)));
	
	if ($file) {
		$file = __DIR__ . DIRECTORY_SEPARATOR . $file;
	} else {
		return '';
	}
	
	//allow only .html extension
	if ($allowedExtension) {
		$file = preg_replace('/\.[^.]+$/', '', $file) . ".$allowedExtension";
	}
	return $file;
}

function showError($error) {
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
	die($error);
}

function validOembedUrl($url) {
	foreach (ALLOWED_OEMBED_DOMAINS as $domain) {
		if (strpos($url, $domain) === 0) {
			return true;
		}
	}
	
	return false;
}

$html   = '';
$file   = '';
$action = '';

if (isset($_POST['startTemplateUrl']) && !empty($_POST['startTemplateUrl'])) {
	$startTemplateUrl = sanitizeFileName($_POST['startTemplateUrl']);
	$html = '';
	if ($startTemplateUrl) {
		$html = file_get_contents($startTemplateUrl);
	}
} else if (isset($_POST['html'])){
	$html = substr($_POST['html'], 0, MAX_FILE_LIMIT);
	if (!ALLOW_PHP) {
		//if (strpos($html, '<?php') !== false) {
		if (preg_match('@<\?php|<\? |<\?=|<\s*script\s*language\s*=\s*"\s*php\s*"\s*>@', $html)) {
			showError('PHP not allowed!');
		}
	}
}

if (isset($_POST['file'])) {
	$file = sanitizeFileName($_POST['file']);
}

if (isset($_GET['action'])) {
	$action = htmlspecialchars(strip_tags($_GET['action']));
}

if ($action) {
	//file manager actions, delete and rename
	switch ($action) {
		case 'rename':
			$newfile = sanitizeFileName($_POST['newfile']);
			if ($file && $newfile) {
				if (rename($file, $newfile)) {
					echo "File '$file' renamed to '$newfile'";
				} else {
					showError("Error renaming file '$file' renamed to '$newfile'");
				}
			}
		break;
		case 'delete':
			if ($file) {
				if (unlink($file)) {
					echo "File '$file' deleted";
				} else {
					showError("Error deleting file '$file'");
				}
			}
		break;
		case 'saveReusable':
		    //block or section
			$type = $_POST['type'] ?? false;
			$name = $_POST['name'] ?? false;
			$html = $_POST['html'] ?? false;
			
			if ($type && $name && $html) {
				
				$file = sanitizeFileName("$type/$name");
				if ($file) {
					$dir = dirname($file);
					if (!is_dir($dir)) {
						echo "$dir folder does not exist\n";
						if (mkdir($dir, 0777, true)) {
							echo "$dir folder was created\n";
						} else {
							showError("Error creating folder '$dir'\n");
						}				
					}
					
					if (file_put_contents($file, $html)) {
						echo "File saved '$file'";
					} else {
						showError("Error saving file '$file'\nPossible causes are missing write permission or incorrect file path!");
					}
				} else {
					showError('Invalid filename!');
				}
			} else {
				showError("Missing reusable element data!\n");
			}
		break;
		case 'oembedProxy':
			$url = $_GET['url'] ?? '';
			if (validOembedUrl($url)) {
				header('Content-Type: application/json');
				echo file_get_contents($url);
			} else {
				showError('Invalid url!');
			}
		break;
		default:
			showError("Invalid action '$action'!");
	}
} else {
	//save page
	if ($html) {
		if ($file) {
			$dir = dirname($file);
			if (!is_dir($dir)) {
				echo "$dir folder does not exist\n";
				if (mkdir($dir, 0777, true)) {
					echo "$dir folder was created\n";
				} else {
					showError("Error creating folder '$dir'\n");
				}
			}

			if (file_put_contents($file, $html)) {
				echo "File saved '$file'";
			} else {
				showError("Error saving file '$file'\nPossible causes are missing write permission or incorrect file path!");
			}	
		} else {
			showError('Filename is empty!');
		}
	} else {
		showError('Html content is empty!');
	}
}
