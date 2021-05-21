<button class="btn-go-to-top "></button>
<button class="btn-go-to-bottom "></button>
<button class="articles__switch__theme__btn switch__theme__btn">
    <?php include $_SERVER['DOCUMENT_ROOT'] . '/media/img/icon_btn_dark_mode.php' ?>
</button>
<div class="container articles__container">
    <h1 class="articles__title">Статьи о бхакти</h1>
    <ul class="articles__list">
        <?php
        for ($key = count($arrayArticles) - 1; $key > 0; $key--) { ?>
            <li data-article-id=<?= $arrayArticles[$key]['id'] ?> data-article-src=<?= $arrayArticles[$key]['path'] ?> class="article__item">
                <div class="article__item__img">
                    <img src=<?= $arrayArticles[$key]['img_url'] ?> alt="">
                </div>
                <h2 class="article__title"><?= $arrayArticles[$key]['second_name'] ?></h2>
                <p class="article__description"></p>
                <p class="article__views">просмотров <?= $arrayViews[$arrayArticles[$key]['name']] ?></p>
            </li>
        <?php
        }
        ?>
    </ul>
</div>