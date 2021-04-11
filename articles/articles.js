function articlesJs() {


    //  функция получения элементов статей и пагинация по ним
    function getElements() {
        // получаем кнопку назад
        let back = document.getElementById('article_back');
        // получаем элементы статей
        let articleItems = document.querySelectorAll('.article__item');

        // обрабатываем клик по статьям
        articleItems.forEach((element) => {
            element.addEventListener('click', () => {
                click(element);
            });
        });
        // обрабатываем клик по кнопке назад
        if (back !== null) {
            back.addEventListener('click', () => {
                click(back);
            });
        }

        // функция обработки кликов
        function click(element) {
            // получаем  data из data атрибута
            let srcArticle = element.dataset.articleSrc;
            // меняем адресную строку
            changeUrl(srcArticle, `${srcArticle}`, "pushState");
            // отправляем ajax запрос
            getPage(srcArticle, true);
        }

    }
    // получаем элементы сразу по загрузке страницы
    getElements();

    // получаем элемент в который будем загружать страничку
    let articlesMain = document.querySelector('.articles_main');

    // записываем параметры url  в переменную
    let srcArticle = getGet();

    // записываем текущее состояние страницы
    changeUrl(srcArticle, null, 'replace')

    // фукция отправки запроса
    async function getPage(srcArticle, scroll) {
        // прокручиваем страничку наверх
        // if (scroll) { window.scrollTo(0, 0); }

        // отправляем запрос
        let response = await fetch(`/articles/body_articles.php?path=${srcArticle}`, {
            method: 'GET',
        });
        if (response.ok) {
            // преобразуем ответ в текст
            let result = await response.text();
            // грузим страничку
            articlesMain.innerHTML = result;
            // получаем элементы статей
            getElements();
        } else {

        }

    }
    // отслеживаем переходы назад и вперед
    window.addEventListener('popstate', () => {
        // проверяем есть ли запись состояния
        if (window.history.state.path !== undefined) {
            // отправляем запрос согласно сохраненому состоянию
            getPage(window.history.state.path, false);
            // changeUrl(window.history.state.id, null, "replace");
        }
    });

    // фукция замены адресной строки
    function changeUrl(srcArticle, url, replace) {
        if (replace === "replace") {
            history.replaceState({ 'path': srcArticle }, null, url);

        } else {
            history.pushState({ 'path': srcArticle }, null, url);
        }
    }
    return (nameFanction) => {
        nameFanction();
    };
}