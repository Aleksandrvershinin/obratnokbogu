<?php
// подключаем файл с функцией счетчика просмотров
include $_SERVER['DOCUMENT_ROOT'] . '/articles/include/count_views.php';

// // функция счетчика просмотров
// $arrayViews = countViews($arrayArticles[$key]['name']);

// подключаем массив с информацией о статьях
include $_SERVER['DOCUMENT_ROOT'] . '/articles/include/array_articles.php';

// подключаем файл с функцией поиска
include_once $_SERVER['DOCUMENT_ROOT'] . '/php/functions.php';
// получаем текущий host
$host = ((!empty($_SERVER['HTTPS'])) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'];
// получаем текущий url
$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
//   очишаем от HTML тегов
$url =  htmlspecialchars($url);
// проверяем существует ли GET запрос
if (isset($_GET["path"]) && $_GET["path"] !== '') {
    //  очишаем от HTML тегов
    $srcArticle =  htmlspecialchars($_GET["path"]);
    $srcArticle = trim($srcArticle);
    // ищем нужную статью из GET запроса
    $key = searchArticle($srcArticle, $arrayArticles);
} else {
    //  ишем статью из URL
    $key = searchArticle($url, $arrayArticles);
}
?>
<section>
    <?
    if ($key !== false) {

        // проверяем главная ли страница
        if ($key !== 0) {
            // функция счетчика просмотров
            checkIp($arrayArticles[$key]['name']);
        }

        // массив с просмотрами
        $arrayViews = getArrayViews();

        // подключаем нужную статью
        include $_SERVER['DOCUMENT_ROOT'] . $arrayArticles[$key]['url'];
    } else {
        // подключаем страницу с ошибкой в случае неудачи поиска
        include $_SERVER['DOCUMENT_ROOT'] . "/php/not_found.php";
    }
    ?>
</section>

<script>
    //    функция передачи get параметров в JS
    function getGet() {
        return <?php echo "'$url'"; ?>
    }
</script>