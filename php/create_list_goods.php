<?php
// подключаем массив с товарами
include $_SERVER['DOCUMENT_ROOT'] . '/magazin/include/goods.php';

foreach ($goods as $key => $value) {
?>
    <div class="magazin-book">
        <li class="books-container-item goods-container-item-js">
            <a <? if ($value["available"]==="true" ) { ?>
                href="<?= $value["path"]; ?>"
                <? } ?>
                ><img src="<?= $value["path_img"]; ?>" alt="картинка">
            </a>
        </li>
        <p class="magazin-book-name"><?= $value["name"]; ?> </p>
        <? if ($value["available"] === "true") { ?>
        <p class="magazin-book-price"> <?= $value["price"]; ?> ₽</p>
        <button data-product-key="<?= $key ?>" class="magazin-book-btn _js-magazin-book-btn btn">
            Купить
        </button>
        <? } else { ?>
        <button class="magazin-book-btn unavailable btn">
            недоступно
        </button>
        <? } ?>

    </div>
<?php
}
