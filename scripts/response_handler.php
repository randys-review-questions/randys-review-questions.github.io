// This code copied from Stack Overflow: 
// https://stackoverflow.com/questions/15722765/saving-a-text-file-on-server-using-javascript

if(!empty($_POST['data'])){
$data = $_POST['data'];
$fname = mktime() . ".txt";//generates random name

$file = fopen("upload/" .$fname, 'w');//creates new file
fwrite($file, $data);
fclose($file);
}