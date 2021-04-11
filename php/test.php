<?php
function read_doc_file($filename)
{
    if (file_exists($filename)) {
        if (($fh = fopen($filename, 'r')) !== false) {
            $headers = fread($fh, 0xA00);

            // 1 = (ord(n)*1) ; Document has from 0 to 255 characters
            $n1 = (ord($headers[0x21C]) - 1);

            // 1 = ((ord(n)-8)*256) ; Document has from 256 to 63743 characters
            $n2 = ((ord($headers[0x21D]) - 8) * 256);

            // 1 = ((ord(n)*256)*256) ; Document has from 63744 to 16775423 characters
            $n3 = ((ord($headers[0x21E]) * 256) * 256);

            // 1 = (((ord(n)*256)*256)*256) ; Document has from 16775424 to 4294965504 characters
            $n4 = (((ord($headers[0x21F]) * 256) * 256) * 256);

            // Total length of text in the document
            $textLength = ($n1 + $n2 + $n3 + $n4);

            $extracted_plaintext = fread($fh, $textLength);
            $extracted_plaintext = mb_convert_encoding($extracted_plaintext, 'UTF-8', 'UTF-16LE');
            return nl2br($extracted_plaintext);
        } else {
            return FALSE;
        }
    } else {
        return FALSE;
    }
}

$text = read_doc_file('../media/files/4) Вся Шикшамрита.docx');

print_r($text);

// <?php
// $name = $_POST['name'];
// $middleName = $_POST['middle-name'];
// $city = $_POST["city"];
// $email = $_POST['email'];
// $phone = $_POST['phone'];
// $goods = $_POST["goods"];

// $name = htmlspecialchars($name);
// $middleName = htmlspecialchars($middleName);
// $city = htmlspecialchars($city);
// $email = htmlspecialchars($email);
// $phone = htmlspecialchars($phone);
// $goods = htmlspecialchars($goods);

// $name = urldecode($name);
// $middleName = urldecode($middleName);
// $city = urldecode($city);
// $email = urldecode($email);
// $phone = urldecode($phone);
// $goods = urldecode($goods);

// $name = trim($name);
// $middleName = trim($middleName);
// $city = trim($city);
// $email = trim($email);
// $phone = trim($phone);
// $goods = trim($goods);

// $arr = preg_split('/\;\,/', $goods, -1, PREG_SPLIT_NO_EMPTY);
// $body = "";
// foreach ($arr as $k => $v) {
//     $body .= "{$v}<br>";
//   };


// $to      = "sanek.vershinin@gmail.com";
// $subject = "Заявка с сайта";
// $messageMail =  "<b>Имя:</b> ".$name."<br>"."
// <b>Отчество:</b> ".$middleName."<br>"
// ."<b>Город:</b> ".$city."<br>"
// ."<b>Телефон:</b> ".$phone."<br>"
// . "<b>E-mail:</b> ".$email. "<br>"
// ."<h2>Товары:</h2> ".$body."<br>";

// $headers = 'From: no-reply@obratnokbogu.ru' . " " .
//     'Reply-To: obratnokbogu@mail.ru' . " " .
//     "Content-type:text/html;charset=UTF-8";


// if (mail($to, $subject, $messageMail, $headers))
//  {

//     $message = "Данные отправлены, мы скоро свяжемся с вами!";
// } else {

//     $message = "Ошибка! Обратитесь к администрации сайта!";
// }
// $response = ['message' => $message];
// header('Content-type: application/json');
// echo json_encode($response);


  // obratnokbogu@mail.ru
