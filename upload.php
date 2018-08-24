<?php
//This script is used by image upload input to save the imge on the server and return the image url to be set as image src attribute.

define('UPLOAD_FOLDER', __DIR__ . '/');
define('UPLOAD_PATH', '/');

move_uploaded_file($_FILES['file']['tmp_name'], UPLOAD_FOLDER . $_FILES['file']['name']);

echo UPLOAD_PATH . $_FILES['file']['name'];
