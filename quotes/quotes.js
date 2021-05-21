(function () {
    // показываем и скрываем Как получить духовное посвящение


    // получаем елементы
    // кнопка "как получить духовное посвящение"
    const getEnBtn = document.querySelector('.get-en-btn');

    // бокс с описанием
    const getEnBoxDescription = document.querySelector('.get-en-box-description');

    // елемент с описанием
    const getEnDescription = document.querySelector('.get-en-description');

    // отслеживаем клик по кнопке
    if (getEnBtn !== null) {
        getEnBtn.addEventListener('click', () => {
            // отбираем или добавляем class элементам
            getEnBoxDescription.classList.toggle('no-hide');
            getEnDescription.classList.toggle('no-hide');
        });
    }





    // показываем, скрываем контейнер с цитатами  и цитаты

    // получаем элементы

    // box с контейнером с цитатами
    let quotesContainerBox = document.querySelector('.files__container__quotes__box');

    //   кнопка тематические подборки цитат
    let quotesJs = document.querySelector('.quotes__js');

    // заголовки
    let titles = document.querySelectorAll('.files__quotes__item_title');

    // boxs с цитатами
    let quotesBoxText = document.querySelectorAll('.files__quotes__item__box_text');


    // Функция показа и скрывания элемента
    function showElement(element) {
        // проверяем развернут контейнер или нет
        if (element.clientHeight === 0) {
            //  выесняем высоту контейнера
            let scrollHeightElement = element.children[0].scrollHeight;

            // показываем контейнер с помощью присвоения высоты блока в высоту box
            element.style.height = `${scrollHeightElement}px`;

        } else {
            // если контейнер развернут, скрываем контейнер путем присвоения высоты box равной 0
            element.style.height = "0px";
        }
    }


    // // отслеживаем клик по кнопке тематические подборки цитат
    // quotesJs.addEventListener('click', () => {
    //     // показываем или скрываем блок с цитатми
    //     showElement(quotesContainerBox);
    // });

    // вешаем обработчик на "click" на заголовки цитат
    titles.forEach((element, index) => {
        element.addEventListener('click', () => {
            // показываем или скрываем цитату
            showElement(quotesBoxText[index]);

            // устанвливаем всему блоку с цитатми высоту auto
            quotesContainerBox.style.height = "auto";
        });
    });




    // заполняем страницу файлами
    // получаем массив с файлами
    // async function getArray() {
    //     let response = await fetch('../php/get-pdf-files.php', {
    //         method: 'POST',
    //     });
    //     let result = await response.json();
    //     newResult = [];
    //     result.sort((a, b) => a.match(/^\d+/) - b.match(/^\d+/));
    //     result.forEach(element => {
    //         nameFile = element.replace(/^\d*\)/, "");
    //         let object = {
    //             name: nameFile,
    //             link: element,
    //         }
    //         newResult.push(object);
    //     });
    //     createList(newResult);
    // }

    // // заполняем список
    // function createList(array) {
    //     // получаем template
    //     let filesTemplate = document.getElementById('files__template');

    //     // получаем ul в которорый будем загружать файлы
    //     let ul = document.querySelector('.files__list');

    //     // получаем элементы для загрузки информации
    //     let li = filesTemplate.content.querySelector('.files__item');
    //     let link = filesTemplate.content.querySelector('.files__item_link');

    //     // перебираем массив и заполняем список
    //     array.forEach(element => {
    //         // link.download = `/media/files/${element}`;
    //         link.href = `/media/files/${element.link}`;
    //         link.textContent = element.name;
    //         ul.append(li.cloneNode(true));
    //     });
    //     let lii = document.querySelectorAll('.files__item');
    //     lii.forEach((element, index) => {
    //         element.addEventListener('click', (e) => {
    //             e.preventDefault();
    //             window.open(`https://docs.google.com/viewer?url=https://obratnokbogu.ru/media/files/${array[index].link.replace(/\s/gi, '+')}`);
    //         })
    //     })

    // }
    // // getArray()
})();