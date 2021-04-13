<script src="/donation/donation.js"></script>
<div class="body__donation body__form hide">
    <div class="container__donation container">
        <div class="shopping-cart__form__close form__close1"></div>
        <div class="shopping-cart__form__close1 form__close2"></div>
        <div class="donation__form__close form__close"></div>
        <div class="donation__description">
            <p>Дорогие гости сайта, Харе Кришна!<br>Примите наши поклоны!</p>
            <p>
                В данный момент в сайт вкладывается много труда, финансов и времени. Сейчас мы работаем над базой поиска, в которой хотим разместить книги, лекции и письма Шрилы Прабхупады. Также хотим реализовать режим чтения книг и другие полезные функций.
                Будем рады за вашу поддержку сайта - «Обратно к Богу».
            </p>
            <p> Вся слава Его Божественной Милости Шриле Прабхупаде!</p>
        </div>
        <form class="donation__form" method="POST" target="_blank" action="https://yoomoney.ru/quickpay/confirm.xml">
            <input type="hidden" name="receiver" value="4100116603698861">
            <input type="hidden" name="quickpay-form" value="donate">
            <input type="hidden" name="targets" value="Пожертвование">
            <input type="hidden" name="formcomment" value="Пожертвование">
            <input type="hidden" name="short-dest" value="Пожертвование">
            <input type="hidden" name="label" value="$order_id">
            <div class="donation__form__item">
                <div class="donation__form__options__title">Выберете способ оплаты</div>
                <div class="donation__form__options">
                    <div class="donation__options__item">
                        <input id="PC" class="donation__form__options__input" checked value="PC" type="radio" name="paymentType">
                        <label for="PC" class="donation__form__options__label">ЮMoney (Яндекс деньги)</label>
                    </div>
                    <div class="donation__options__item">
                        <input id="AC" class="donation__form__options__input" value="AC" type="radio" name="paymentType">
                        <label for="AC" class="donation__form__options__label">Банковской картой</label>
                    </div>
                    <div class="donation__options__item">
                        <input id="MC" class="donation__form__options__input" value="MC" type="radio" name="paymentType">
                        <label for="MC" class="donation__form__options__label">С баланса мобильного</label>
                    </div>
                </div>
            </div>
            <div class="donation__form__item">
                <div class="donation__form__btn__sum__body" data-sum-body="108">
                    <input data-sum="108" class="donation__form__btn__sum" type="button" value="108 рублей">
                </div>
                <div class="donation__form__btn__sum__body is-active" data-sum-body="1008">
                    <input data-sum="1008" class="donation__form__btn__sum" type="button" value="1008 рублей">
                </div>
                <div class="donation__form__btn__sum__body" data-sum-body="0">
                    <input data-sum="0" class="donation__form__btn__sum" type="button" value="ввести сумму">
                </div>
                <div class="donation__form__item donation__form__item__sum hide">
                    <label class="donation__form__label__sum hide" for="sum">В ведите сумму в рублях</label>
                    <input class="donation__form__input__sum donation__form__btn__sum " id="sum" type="text" name="sum" value="1008" data-type="number">
                </div>
            </div>
            <div class="donation__form__item donation__form__item__message">
                <textarea placeholder="Комментарий.." class="donation__form__input__message" type="text" id="comment" name="comment" value=""></textarea>
            </div>

            <!-- <input type="hidden" name="need-fio" value="true">
            <input type="hidden" name="need-email" value="true">
            <input type="hidden" name="need-phone" value="false">
            <input type="hidden" name="need-address" value="false"> -->
            <div class="donation__form__item donation__form__item__btn">
                <input class="donation__form__input__btn" type="submit" value="Перевести">
            </div>

        </form>
    </div>
</div>