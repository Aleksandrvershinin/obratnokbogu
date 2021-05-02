<?php
// сравнение url
function isCurrentUrl($value)
{
    return cutUrl(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))  == $value;
}
// функция обрезки URL по регулярке
function cutUrl($url)
{
    preg_match('/\/.*\//', $url, $found);
    return $found[0];
}

// функция поиска по URL
function searchArticle($name, $array)
{
    $key = array_search($name, array_column($array, 'path'));
    return $key;
}
