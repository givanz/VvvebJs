<?php
define('MAX_FILE_LIMIT', 1024 * 1024 * 2);//2 Megabytes max html file size

//sanitize and remove double dot ..
$fileName = __DIR__ . '/' . preg_replace('@\.{2,}@' , '', preg_replace('@[^\/\\a-zA-Z0-9\-\._]@','', $_POST['fileName']));

$html = substr($_POST['html'], 0, MAX_FILE_LIMIT);

if (file_put_contents($fileName, $html)) 
echo $fileName;
else echo 'Error saving file '  . $fileName;
