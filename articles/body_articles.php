<?php
// подключаем массив с информацией о статьях
include $_SERVER['DOCUMENT_ROOT'] . '/articles/array_articles.php';

// подключаем файл с функцией поиска
include $_SERVER['DOCUMENT_ROOT'] . '/php/functions.php';

// получаем текущий url
$url = $_SERVER['REQUEST_URI'];

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
if ($key !== false) {
    // подключаем нужную статью
    include $_SERVER['DOCUMENT_ROOT'] . $arrayArticles[$key]['url'];
    // проверяем основная ли страница, для подгрузки кнопки gototop
    if ($arrayArticles[$key]['url'] !== "/articles/articles/index.php") {
    }
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