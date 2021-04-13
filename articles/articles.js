function articlesJs() {
    // записываем параметры url  в переменную
    let srcArticle = getGet();

    // получаем название статьи
    let nameArticle = getName(srcArticle);


    // запускаем skroll
    srollTo(getInfoLocalStorage(nameArticle));

    // функция получения названия статьи
    function getName(url) {
        let urlReplase = url.replace(/\//gi, '');
        let getName;
        if (urlReplase !== 'articles') {
            getName = url.replace(/^\/\w+\//gi, '');
            getName = getName.replace(/\//gi, '');
        } else {
            getName = 'articles';
        }

        return getName;
    }

    // функция получения из localStorage
    function getInfoLocalStorage(nameArticle) {
        let scrolled = localStorage.getItem(nameArticle);
        if (nameArticle === 'articles') {
            scrolled = 0;
        } else {
            if (scrolled === null) {
                scrolled = 0
            }
        }

        return scrolled;
    }

    // функция скролла
    function srollTo(scrolled) {
        window.scrollTo({ top: scrolled });
    }
    // функция запуска скрола
    function startScroll() {
        document.onscroll = () => {
            trackScroll();
        }
    }
    startScroll();

    // функция получения scroll
    function trackScroll() {
        let scrolled = window.pageYOffset;
        setInfoLocalStorage(scrolled);

    }

    // функция сохранения scrolled в localStorage
    function setInfoLocalStorage(scrolled) {
        localStorage.setItem(nameArticle, scrolled);
    }

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
            srcArticle = element.dataset.articleSrc;
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


    // записываем текущее состояние страницы
    changeUrl(srcArticle, null, 'replace')

    // фукция отправки запроса
    async function getPage(srcArticle) {
        // получаем название статьи
        nameArticle = getName(srcArticle);
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

            // запускаем skroll
            srollTo(getInfoLocalStorage(nameArticle));
            startScroll();
        } else {

        }

    }
    // отслеживаем переходы назад и вперед
    window.addEventListener('popstate', () => {
        // проверяем есть ли запись состояния
        if (window.history.state.path !== undefined) {
            // отправляем запрос согласно сохраненому состоянию
            getPage(window.history.state.path);
            // changeUrl(window.history.state.id, null, "replace");

            // удаляем обработчик на scroll
            document.onscroll = null;
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