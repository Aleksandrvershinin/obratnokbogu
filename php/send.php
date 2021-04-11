<?php
// получаем данные переданные из формы
$name = $_POST['name'];
$middleName = $_POST['middle-name'];
$city = $_POST["city"];
$email = $_POST['email'];
$phone = $_POST['phone'];
$goods = $_POST["goods"];

// очищаем данные от html
$name = htmlspecialchars($name);
$middleName = htmlspecialchars($middleName);
$city = htmlspecialchars($city);
$email = htmlspecialchars($email);
$phone = htmlspecialchars($phone);
$goods = htmlspecialchars($goods);

// очищаем данные от url
$name = urldecode($name);
$middleName = urldecode($middleName);
$city = urldecode($city);
$email = urldecode($email);
$phone = urldecode($phone);
$goods = urldecode($goods);

// очищаем данные от пробелов
$name = trim($name);
$middleName = trim($middleName);
$city = trim($city);
$email = trim($email);
$phone = trim($phone);
$goods = trim($goods);

// разбиваем строку на массив
$arr = preg_split('/\;\,/', $goods, -1, PREG_SPLIT_NO_EMPTY);

// создаем строку в которой после каждого товара добавляем перенос строки
$body = "";
foreach ($arr as $k => $v) {
  $body .= "{$v}<br>";
};

// создаем сообщение
$to      = "obratnokbogu@mail.ru";
$subject = "Заявка с сайта";
$messageMail =  "<b>Имя:</b> " . $name . "<br>" . "
<b>Отчество:</b> " . $middleName . "<br>"
  . "<b>Город:</b> " . $city . "<br>"
  . "<b>Телефон:</b> " . $phone . "<br>"
  . "<b>E-mail:</b> " . $email . "<br>"
  . "<h2>Товары:</h2> " . $body . "<br>";

$headers = "From: no-reply@obratnokbogu.ru \r\n" . "Content-type:text/html;charset=UTF-8";

if (mail($to, $subject, $messageMail, $headers)) {

  $message = "Данные отправлены, мы скоро свяжемся с вами!";
} else {

  $message = "Ошибка! Обратитесь к администрации сайта!";
}
$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);



  // obratnokbogu@mail.ru
