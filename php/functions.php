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
//  функция вывода меню
function writeMenu($menu)
{ ?>
    <nav class="header-nav">
        <ul class="header-nav-lists">
            <?php
            foreach ($menu as $key => $value) {
            ?>
                <li class="header-nav-item <? if (isCurrentUrl($value['path'])) echo 'is-active'; ?>">
                    <a href="<?= $value['path']; ?>"><?= $value['title']; ?></a>
                </li>
            <?php
            }
            ?>
            <!-- <li class="header-nav-item">
            <a href="/audio">аудио</a>
        </li>
        <li class="header-nav-item">
            <a href="/video">видео</a>
        </li>
        <li class="header-nav-item">
            <a href="/photo">фото</a>
        </li>
        <li class="header-nav-item">
            <a href="/magazin">магазин</a>
        </li>
        <li class="header-nav-item">
            <a href="/articles">статьи</a>
        </li>
        <li class="header-nav-item">
            <a href="/files">файлы</a>
        </li>
        <li class="header-nav-item">
            <a href="#">база поиска</a>
        </li> -->
        </ul>
    </nav>
<?php }
