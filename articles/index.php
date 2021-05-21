<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- подключаем скрипт и стили для поделиться -->
    <script class="script-share" src="/js/share_social_media.js" async></script>
    <link rel="stylesheet" href="/style/share_social_media.css">

    <script src="/articles/articles.js"></script>
    <script src="/js/main.js"></script>


    <link rel="stylesheet" href="/style/normalize.css">
    <link rel="stylesheet" href="/style/style.css">

    <!-- скрипт и стили для переключения ночной темы -->
    <link rel="stylesheet" href="/style/light_style.css" class="style__theme">
    <script defer src="/js/switch_theme.js"></script>

    <title>Статьи</title>
</head>

<body id="articles">
    <? include $_SERVER['DOCUMENT_ROOT'] . '/php/header.php'; ?>
    <div class="main-and-footer">
        <main class="main articles_main">

            <?php include $_SERVER['DOCUMENT_ROOT'] . '/articles/include/body_articles.php'; ?>

        </main>
        <?php include $_SERVER['DOCUMENT_ROOT'] . '/php/footer.php'; ?>
    </div>
</body>

</html>
<script>
    let articlesJS = articlesJs();
</script>