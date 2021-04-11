<?php
// функция поиска по URL
function searchArticle($name, $array)
{
    $key = array_search($name, array_column($array, 'path'));
    return $key;
}
