<?php 
/* Принимаем данные из формы */ 
  $name = $_POST["name"]; 
  $email = $_POST["email"]; 
  $message = $_POST["message"]; 
 
/* Подключаемся к БД */ 
$db = mysqli_connect("localhost", "root", ""); 
mysqli_select_db($db, "vito"); 
 
 
 $sql = "INSERT INTO Zayvka(Name,Email, Message) VALUES ('$name','$email','$message')"; 
 $result=mysqli_query($db, $sql) or die("Ошибка в запросе!".mysqli_error($db)); 
 
$result=mysqli_query($db, $sql) or die("Ошибка в запросе!".mysqli_error($db)); 
if (mysqli_error($db)) 
{ 
  echo 'Ошибка'; 
} else { 
  echo 'Форма успешно выполнена'; 
} 
?>