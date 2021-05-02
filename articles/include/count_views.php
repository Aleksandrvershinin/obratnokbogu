<?php
//  получаем массив с количеством просмотров
function getArrayViews()
{
    // путь к файлу
    $path = $_SERVER['DOCUMENT_ROOT'] . '/data/count_views_articles.txt';

    $file = file($path);
    $array = [];

    // проходим по всем строкам в файле
    for ($i = 0; $i < sizeof($file); $i++) {

        //  записываем строку в массив разделяя с помощью разделителя
        $line = explode(" ", $file[$i]);

        $array[$line[0]] = $line[1];
    }
    return $array;
}
getArrayViews();

function countViews($nameArticle)
{
    // путь к файлу
    $path = $_SERVER['DOCUMENT_ROOT'] . '/data/count_views_articles.txt';

    $file = file($path);

    //  получаем массив с количеством просмотров
    $array = getArrayViews();

    if (array_key_exists($nameArticle, $array)) {
        $value = $array[$nameArticle];
        $value = (int) $value;
        $array[$nameArticle] = ++$value . "\n";
    } else {
        $array[$nameArticle] = 1 . "\n";
    }

    // открываем файл
    $fp = fopen($path, 'w');

    foreach ($array as $key => $value) {
        $line = $key . " " . $value;

        // записываем строку в файл
        fputs($fp, $line);
    }

    // закрываем файл
    fclose($fp);
}
function checkIp($nameArticle)
{
    // путь к файлу
    $path = $_SERVER['DOCUMENT_ROOT'] . '/data/ip_users.txt';

    $file = file_get_contents($path);
    $file = json_decode($file, TRUE);


    // пулучаем ип пользователя
    $ip = $_SERVER['REMOTE_ADDR'];
    // проверяем существует ли ип
    if (!array_key_exists($ip, $file)) {
        $file[$ip] = [
            $nameArticle,
        ];
        countViews($nameArticle);
    } else {
        $key = array_search($nameArticle, $file[$ip]);
        if ($key === false) {
            array_push($file[$ip], $nameArticle);
            countViews($nameArticle);
        }
    }

    file_put_contents($path,  json_encode($file), LOCK_EX);
}
