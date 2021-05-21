function articlesJs() {
    // получаем кнопку назад
    let back = document.querySelector('.back__btn');

    // записываем параметры url  в переменную
    let srcArticle = getGet();
    // получаем данные о скроле
    let articlesSkroll = getInfoLocalStorage();
    // получаем название статьи
    let nameArticle = getName(srcArticle);

    // запускаем skroll
    srollTo(nameArticle);

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
    function getInfoLocalStorage() {
        let articlesSkroll = localStorage.getItem('articlesSkroll');
        articlesSkroll = JSON.parse(articlesSkroll);
        if (articlesSkroll === null) {
            articlesSkroll = new Object;
        }
        return articlesSkroll;
    }

    // функция скролла
    function srollTo(nameArticle) {
        // получаем данные из LocalStorage
        let articlesSkroll = getInfoLocalStorage();
        if (nameArticle !== 'articles') { // проверяем главную страницу со статьями
            // записываем скрол
            let scrolled = articlesSkroll[nameArticle];
            if (articlesSkroll[nameArticle] === undefined) { // проверяем есть ли запись с данной страницы
                // если нет выставляем скролл в 0
                scrolled = 0;
            }
            // прокручиваем страницу
            window.scrollTo({
                top: scrolled
            });
        }
    }

    // функция запуска скрола
    function startScroll() {
        document.onscroll = () => {
            trackScrollArticle();
        }
    }
    startScroll();

    // функция получения scroll
    function trackScrollArticle() {
        // получаем кнопку переключения ночного режима
        let changeModeBtn = document.querySelector('.articles__switch__theme__btn');

        let scrolled = window.pageYOffset;
        // проверяем существует ли кнопка
        if (changeModeBtn !== null) {
            changeParamBtn(changeModeBtn, scrolled);
        }
        setInfoLocalStorage(scrolled, nameArticle);
        changeParamBtn(back, scrolled);
    }

    // функция изменения положения кнопок
    function changeParamBtn(elem, scrolled) {
        if (elem !== null) {
            if (scrolled > 60) {
                elem.style.position = 'fixed'
                elem.style.top = '15px'
            }
            if (scrolled < 60) {
                elem.removeAttribute('style');
            }
        }

    }
    // функция сохранения scrolled в localStorage
    function setInfoLocalStorage(scrolled, nameArticle) {
        articlesSkroll[nameArticle] = scrolled;
        localStorage.setItem('articlesSkroll', JSON.stringify(articlesSkroll));
    }

    //  функция получения элементов статей и пагинация по ним
    function getElements() {
        // получаем кнопку назад
        back = back = document.querySelector('.back__btn');
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
    // функция добавления кнопки goToTop в статьях
    addGoToTop();

    // функция добавления кнопки вверх на странице выбора статьи
    startBtnGoToTop();
    // получаем элемент в который будем загружать страничку
    let articlesMain = document.querySelector('.articles_main');


    // записываем текущее состояние страницы
    changeUrl(srcArticle, null, 'replace')

    // фукция отправки запроса
    async function getPage(srcArticle) {
        // получаем название статьи
        nameArticle = getName(srcArticle);
        // отправляем запрос
        let response = await fetch(`/articles/include/body_articles.php?path=${srcArticle}`, {
            method: 'GET',
        });
        if (response.ok) {
            // преобразуем ответ в текст
            let result = await response.text();
            // грузим страничку
            articlesMain.innerHTML = result;
            // получаем элементы статей
            getElements();
            // функция добавления кнопки goToTop в статьях
            addGoToTop();
            // запускаем skroll
            srollTo(nameArticle);
            startScroll();
            // функция добавления кнопки вверх на странице выбора статьи
            startBtnGoToTop();
            // инцилизации скрипта поделиться
            initShare();

            // инцилизации скрипта смены темы
            switchTheme();
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
            history.replaceState({
                'path': srcArticle
            }, null, url);

        } else {
            history.pushState({
                'path': srcArticle
            }, null, url);
        }
    }

    // функция добавления кнопки goToTop в статьях
    function addGoToTop() {
        let goTopBtn = document.getElementById('btn-top');
        // обработка события 'scroll'
        window.addEventListener('scroll', trackScroll, {
            passive: true
        });

        if (goTopBtn !== null) {
            // обработка события 'click' для скролла
            goTopBtn.addEventListener('click', goToTop);
        }

        function trackScroll() {
            let scrolled = window.pageYOffset;

            if (scrolled > 100) {
                if (goTopBtn !== null) {
                    goTopBtn.classList.add('btn-top-show');
                }
            }
            if (scrolled < 100) {
                if (goTopBtn !== null) {
                    goTopBtn.classList.remove('btn-top-show');
                }
            }
        }
        // показываем кнопки
        trackScroll();
        // функция скролла наверх
        function goToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    function startBtnGoToTop() {
        // получаем url страницы
        let url = document.location.pathname;
        // проверяем адрес
        if (url === '/articles/') {
            addBtnGoToTop();
        }
    }



    // функция инцилизации скрипта поделиться
    function initShare() {
        let scriptShare = document.querySelector('.script-share');
        scriptShare.remove();
        scriptShare = document.createElement('script');
        scriptShare.classList.add('script-share');
        scriptShare.src = "/js/share_social_media.js";
        scriptShare.async = true;
        document.getElementsByTagName('head')[0].appendChild(scriptShare);
    }
}