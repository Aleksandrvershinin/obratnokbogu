document.addEventListener('DOMContentLoaded', () => {
    // получаем массив с товарами
    getGoods();
    // функция GET запроса массива с товарами
    async function getGoods() {

        let response = await fetch('/magazin/include/send_goods.php', {
            method: 'get',
        });

        let goods = await response.json();
        main(goods);
    };
    function main(goods) {
        // получаем элемент в который будем загружать карточки книг
        const containerListBook = document.querySelector('.shopping-cart__list');

        //  функция скрывания описания корзины
        function hideDescription(parametr) {
            let i = document.querySelector('.shopping-cart__description');
            parametr === 1 ? i.classList.add('hide') : i.classList.remove('hide');

        }

        // функция создания карточек товаров
        function createCartsItem() {
            // удаляем ранее созданные карточки
            document.querySelectorAll('.shopping-cart__item').forEach(e => { e.remove() });

            // получаем template
            let templateShoppingCart = document.getElementById('template__item__shopping-cart');

            // получаем ul в него будем загружать карточки
            let ul = document.querySelector('.shopping-cart__list');

            // создаем переменные с количеством товаров, общей ценой и общим весом
            let totalGoods = 0;
            let totalSum = 0;
            let totalWeight = 0;
            // создаем итерацию по всему массиву с ключами товаров
            goodsInShoppingCart.forEach(element => {

                // получаем элементы в которые будем загружать информацию о книге
                let name = templateShoppingCart.content.querySelector('.shopping-cart__item__name');
                let href = templateShoppingCart.content.querySelector('.shopping-cart__item__href');
                let img = templateShoppingCart.content.querySelector('.shopping-cart__item__img');
                let quantity = templateShoppingCart.content.querySelector('.shopping-cart__item__panel_quantity');
                let btn = templateShoppingCart.content.querySelector('.shopping-cart__item__panel_delete');
                let totalPrice = templateShoppingCart.content.querySelector('.shopping-cart__item__total-price');
                let weight = templateShoppingCart.content.querySelector('.shopping-cart__item__weight');

                // считаем вес
                totalWeight += goods[element.key].weight * element.quantity;

                // Заполняем карточку
                name.textContent = goods[element.key].name;
                href.href = goods[element.key].path;
                img.src = goods[element.key].path_img;
                quantity.textContent = element.quantity;
                btn.dataset.btnDeleteBook = element.key;
                totalPrice.textContent = parseInt(goods[element.key].price) * element.quantity + ' ₽';
                weight.textContent = `${goods[element.key].weight * element.quantity} грамм`;
                let li = templateShoppingCart.content.cloneNode(true);
                ul.append(li)
                totalGoods = totalGoods + element.quantity;
                totalSum = totalSum + parseInt(goods[element.key].price) * element.quantity;


            });
            // Получаем элемент header panel
            let shoppingCartHederPanel = document.querySelectorAll('.shopping-cart__row__header-panel');

            // удаляем header panel
            shoppingCartHederPanel.forEach(element => { element.remove() });

            // Получаем элемент заказа товара
            let shoppingCartTotalRow = document.querySelectorAll('.shopping-cart__total__row');

            // удаляем ранее созданный элемент заказа товара
            shoppingCartTotalRow.forEach(element => { element.remove() })

            if (totalGoods > 0) {
                hideDescription(1);
                // получаем template total header
                let templateShoppingCartHeader = document.getElementById('template__header__shopping-cart');

                // получаем элементы которые будем заполнять
                let totalQuantity = templateShoppingCartHeader.content.querySelector('.shopping-cart__total-quantity');

                // получаем template total
                let templateShoppingCartTotal = document.getElementById('template__total__shopping-cart');

                // получаем элементы которые будем заполнять
                let totalGoodsElem = templateShoppingCartTotal.content.querySelector('.shopping-cart__total__goods');
                let totalSumElem = templateShoppingCartTotal.content.querySelector('.shopping-cart__total__sum');

                // получаем box в который загрузим элемент для заказа товара
                let shoppingCartBox = document.querySelector('.shopping-cart__box');

                // заполняем элементы информацией
                if (goodsInShoppingCart.length === 1) {
                    totalQuantity.textContent = `${goodsInShoppingCart.length} наименование`;
                } else if (goodsInShoppingCart.length < 5) {
                    totalQuantity.textContent = `${goodsInShoppingCart.length} наименования`;
                } else {
                    totalQuantity.textContent = `${goodsInShoppingCart.length} наименований`;
                }

                if (totalGoods == 1) {
                    totalGoodsElem.textContent = `${totalGoods} товар на ${totalWeight} Грамм`;
                } else if (totalGoods < 5) {
                    totalGoodsElem.textContent = `${totalGoods} товара на ${totalWeight} Грамм`;
                } else {
                    totalGoodsElem.textContent = `${totalGoods} товаров на ${totalWeight} Грамм`;
                }
                ul.prepend(templateShoppingCartHeader.content.cloneNode(true));
                totalSumElem.textContent = `Итого без доставки ${totalSum} ₽`;
                let row = templateShoppingCartTotal.content.cloneNode(true);
                shoppingCartBox.append(row);

                createEventListener()
            } else {
                hideDescription(0)
            }
        }

        //функция удаления
        function deleteBook(key) {
            let index = goodsInShoppingCart.findIndex(e => e.key === key);
            if (index !== -1) {
                goodsInShoppingCart.splice(index, 1);
            }
        }

        //функция сохранения в localStorage
        function setLocalStorage() {
            localStorage.setItem('goodsInShoppingCart', JSON.stringify(goodsInShoppingCart));
        }


        //вешаем обработчик на LocalStorage
        window.addEventListener('storage', () => {
            getLocalStorage();
            createCartsItem();
        });


        // функция уменьшения колличества книг
        function downQuantity(index) {
            if (goodsInShoppingCart[index].quantity <= 1) {
                return
            } else {
                goodsInShoppingCart[index].quantity--;
                setLocalStorage();
                getLocalStorage();
                createCartsItem();
            }
        }
        // функция увеличения колличества книг
        function upQuantity(index) {
            goodsInShoppingCart[index].quantity++;
            setLocalStorage();
            getLocalStorage();
            createCartsItem();
        }

        // функция обработки события "click" на кнопке up и down

        createCartsItem();

        // функция очищения корзины
        function cleanShoppingCart() {
            goodsInShoppingCart = [];
            setLocalStorage();
            getLocalStorage();
            createCartsItem();
            countShoppingCart();
        }

        // функция получения и создания обработчиков событий
        function createEventListener() {
            // получаем кнопку удалить все товары
            let btndeleteAll = document.querySelector('.shopping-cart__delete-all-goods__btn');

            // вешаем обработчик и удаляем все товары из корзины
            btndeleteAll.addEventListener('click', cleanShoppingCart);

            // Получем кнопки удалить
            let btndelete = document.querySelectorAll('[data-btn-delete-book]');
            btndelete.forEach(element => {
                element.addEventListener('click', () => {
                    deleteBook(element.dataset.btnDeleteBook);
                    setLocalStorage();
                    getLocalStorage();
                    createCartsItem();
                    countShoppingCart();
                });
            });

            // получаем кнопки up и down
            let btnUp = document.querySelectorAll('.shopping-cart__item__panel_up');
            let btnDown = document.querySelectorAll('.shopping-cart__item__panel_down');

            btnUp.forEach((element, index) => {
                element.addEventListener('click', () => {
                    upQuantity(index)
                });
            });
            btnDown.forEach((element, index) => {
                element.addEventListener('click', () => {
                    downQuantity(index)
                });
            });


            // получаем кнопку оформить заказ
            const openCheckOutOrder = document.querySelector('.shopping-cart__total__btn');

            // получаем тело формы оформления заказа
            const shoppingCartBodyForm = document.querySelector('.shopping-cart__body__form');

            // обрабатываем клик по кнопке оформить заказ
            openCheckOutOrder.addEventListener('click', () => {
                shoppingCartBodyForm.classList.remove('hide');
            });

            // обрабатываем клик в окне с формой
            shoppingCartBodyForm.addEventListener('click', (event) => {
                closeShoppingCartForm(event.target);
            });
        }
        // функция закрытия формы с оформлением заказа
        function closeShoppingCartForm(event = document.querySelector('.shopping-cart__form__close2')) {
            if (event === document.querySelector('.shopping-cart__form__close2')) {
                const shoppingCartBodyForm = document.querySelector('.shopping-cart__body__form');
                shoppingCartBodyForm.classList.add('hide');
            }
        }

        // получаем форму
        const shoppingCartForm = document.querySelector('.shopping-cart__form');

        // вешаем обработчик на форму
        shoppingCartForm.addEventListener('submit', formSend);

        // функция отправки формы
        async function formSend(event) {
            event.preventDefault();

            // переменная отслеживания валидации формы
            let error = formValidate(shoppingCartForm);

            // готовим товары к отправке
            let sendingGoods = []
            goodsInShoppingCart.forEach(element => {
                let object = `${goods[element.key].name}, колличество: ${element.quantity};`
                sendingGoods.push(object);
            });
            // получаем данные из формы
            let formData = new FormData(shoppingCartForm)
            formData.append('goods', sendingGoods);
            // проверяем валидна ли форма и отправляем
            if (error === 0) {
                shoppingCartForm.classList.add("_sending");
                let response = await fetch('/php/send.php', {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    let result = await response.json();
                    shoppingCartForm.reset();
                    shoppingCartForm.classList.remove("_sending");
                    cleanShoppingCart()
                    closeShoppingCartForm()
                    document.querySelector('.shopping-cart__description').textContent = result.message;
                } else {
                    shoppingCartForm.classList.remove("_sending");
                    alert("произошла ошибка, попробуйте еще раз");
                }
            }
        }

        // функция валидации формы
        function formValidate(shoppingCartForm) {
            let error = 0;

            // получаем елементы которые обязательны к заполнению
            const formReq = document.querySelectorAll('.req');

            //  проходимся по всем полям обязательных к заполнению
            for (let index = 0; index < formReq.length; index++) {

                //  удаляем подсветку ошибки
                const input = formReq[index];
                formRemoveError(input);

                // находим input с e-mail
                if (input.classList.contains('_email')) {

                    // проверяем email
                    if (emailTest(input)) {
                        formAddError(input);
                        error++;
                    }
                    // проверяем телефон
                } else if (input.getAttribute('type') === 'tel') {
                    phonelTest(input);
                    if (input.value === '') {
                        formAddError(input);
                        error++;
                    }
                    // проверяем на заполненость остальные обязательные поля
                } else {
                    if (input.value.trim() === '') {
                        input.value = input.value.trim()
                        formAddError(input);
                        error++;
                    }
                }
            }
            return error;
        }
        //  функция добавления подсветки ошибки
        function formAddError(input) {
            // input.parentElement.classList.add('_error');
            input.classList.add('_error');
        }

        //  функция удаления подсветки ошибки
        function formRemoveError(input) {
            // input.parentElement.classList.remove('_error');
            input.classList.remove('_error');
        }

        // функция проверки email
        function emailTest(input) {
            return !/.+@.+\..+/ig.test(input.value);
        }

        // функция проверки телефона
        function phonelTest(input) {
            input.value = input.value.replace(/[^\d\+]/gi, '');
        }
    }


});