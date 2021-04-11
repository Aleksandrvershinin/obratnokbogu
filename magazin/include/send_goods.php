<?php
// подключаем массив с товарами
include $_SERVER['DOCUMENT_ROOT'] . '/magazin/include/goods.php';
echo json_encode($goods);
