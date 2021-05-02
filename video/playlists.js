// создаем массив плей листов
const playlists = [
    {
        name: "Короткометражные фильмы",
        list: [
            {
                name: "Биография Шрилы Прабхупада",
                href: "https://www.youtube.com/embed/9e2bAbWHUus",
            },
            {
                name: "Безценные дары",
                href: "https://www.youtube.com/embed/O2KclQzkQ-0",
            },
            {
                name: "Счастье на второй Авеню",
                href: "https://www.youtube.com/embed/EOZaKRJZzvg",
            },
            {
                name: "Свамиджи",
                href: "https://www.youtube.com/embed/7yiN9D0XFhA",
            },
            {
                name: "Нектарин",
                href: "https://www.youtube.com/embed/79m645OW0Sk",
            },
            {
                name: "Парамахамса",
                href: "https://www.youtube.com/embed/Cv8sfXNKRKI",
            },
            {
                name: "Подобное солнцу",
                href: "https://www.youtube.com/embed/B_rI2Omnoy8",
            },
            {
                name: "Человек с Вайкунтхи",
                href: "https://www.youtube.com/embed/WDybMMmSbZ0",
            },
            {
                name: "Гурудев",
                href: "https://www.youtube.com/embed/pF_8LHUNJnk",
            },
            {
                name: "Вайшнавы",
                href: "https://www.youtube.com/embed/loaioibSKxo",
            },
            {
                name: "Парампара медитация",
                href: "https://www.youtube.com/embed/DsulUzojgTU",
            },
            {
                name: "Нектар Шрилы Прабхупады",
                href: "https://www.youtube.com/embed/hJEkoZ1KiUk",
            },
            {
                name: "Люди Харе Кришна",
                href: "https://www.youtube.com/embed/8dZ3rLVRuWo",
            },
            {
                name: "Вести их мог только Он",
                href: "https://www.youtube.com/embed/Y7eR113KPKA",
            },
            {
                name: "Первый визит в Австралию Сидней, 1971 г.",
                href: "https://www.youtube.com/embed/iJHpT0ippog",
            },
            {
                name: "Шрила Прабхупада в Бомбее",
                href: "https://www.youtube.com/embed/qDLR6NJD5xE",
            },
            {
                name: "Шрила Прабхупада в Нью-Двараке",
                href: "https://www.youtube.com/embed/OohX56Ws7gg",
            },
            {
                name: "Проповедническая программа в Мельбурне",
                href: "https://www.youtube.com/embed/JvQ21jUPVv0",
            },
            {
                name: "Первый фестиваль Ратха-Ятра",
                href: "https://www.youtube.com/embed/xS2AsP7hYhA",
            },
            {
                name: "Проповедническая программа и Ратха-ятра 1974 г.",
                href: "https://www.youtube.com/embed/BQshuh2Nn1k",
            },
            {
                name: "Первая Ратха-Ятра Сан-Франциско, июнь 1968 г.",
                href: "https://www.youtube.com/embed/G-ilvsxjkCw",
            },
            {
                name: "Фестиваль Ратха-Ятры в Филадельфии 1975 г.",
                href: "https://www.youtube.com/embed/Vzxk7cMoN3U",
            },
            {
                name: "Ратха-Ятра Мельбурн, 1974 г.",
                href: "https://www.youtube.com/embed/T9JBPtvwFcw",
            },
            {
                name: "Фестиваль Ратха-Ятра 2 Мельбурн, 1974 г.",
                href: "https://www.youtube.com/embed/aXvO-R5Cni4",
            },
            {
                name: "Фильм Джорджа Харрисона",
                href: "https://www.youtube.com/embed/DbhPJY_oaaI",
            },
            {
                name: "Джапа с Шрилой Прабхупадой",
                href: "https://www.youtube.com/embed/z2zO1Lz8phk",
            },
            {
                name: "Свадебная церемония 1973 г.",
                href: "https://www.youtube.com/embed/YRWLhVR-E18",
            },
            {
                name: "Париж инсталляция Божеств",
                href: "https://www.youtube.com/embed/HENo2g7J9bY",
            },
            {
                name: "Шрила Прабхупада – Киртан",
                href: "https://www.youtube.com/embed/WpQNemYMW_U",
            },
            {
                name: "Киртан в Парижском храме август 1973 г.",
                href: "https://www.youtube.com/embed/ZCUTIApamPc",
            },
            {
                name: "Великий ачарья Шрила Прабхупада",
                href: "https://www.youtube.com/embed/73qZcIRNFps",
            },
            {
                name: "Восходит луна Господа Чайтаньи",
                href: "https://www.youtube.com/embed/dJ-TBzQ06jc",
            },
            {
                name: "Истинный гуру Шрила Прабхупада",
                href: "https://www.youtube.com/embed/1y2Xw9kEZiM",
            },
            {
                name: "Последний урок Шрилы Прабхупады",
                href: "https://www.youtube.com/embed/JK_pjBUbrOE",
            },
            {
                name: "Джордж Харисон «Мы вечные»",
                href: "https://www.youtube.com/embed/L_RCjqonb3k",
            }

        ]
    },
    {
        name: "По стопам Шрилы Прабхупады",
        list: [
            {
                name: "По стопам - фильм 1",
                href: "https://www.youtube.com/embed/0Ie8f9luvoA",
            },
            {
                name: "По стопам - фильм 2",
                href: "https://www.youtube.com/embed/JNRQZHh77VY",
            },
            {
                name: "По стопам - фильм 3",
                href: "https://www.youtube.com/embed/aAtjLy-AoDY",
            },
            {
                name: "По стопам - фильм 4",
                href: "https://www.youtube.com/embed/q49EP9pD52k",
            },
            {
                name: "По стопам - фильм 5",
                href: "https://www.youtube.com/embed/uw-6eutMVj8",
            },
            {
                name: "По стопам - фильм 6",
                href: "https://www.youtube.com/embed/b9-GCwCcKRM",
            },
            {
                name: "По стопам - фильм 7",
                href: "https://www.youtube.com/embed/suMWuJtsi14",
            },
            {
                name: "По стопам - фильм 8",
                href: "https://www.youtube.com/embed/Dp_KFVR0ECc",
            },
            {
                name: "По стопам - фильм 9",
                href: "https://www.youtube.com/embed/eupD6K0foPM",
            },
            {
                name: "По стопам - фильм 10",
                href: "https://www.youtube.com/embed/ipHQz58QQTA",
            },
            {
                name: "По стопам - фильм 11",
                href: "https://www.youtube.com/embed/cMZStiAIqRQ",
            },
            {
                name: "По стопам - фильм 12",
                href: "https://www.youtube.com/embed/rOC28hk4Q2I",
            },
        ]
    },
    {
        name: "Ачарья сборник",
        list: [
            {
                name: "Ачарья - фильм 1",
                href: "https://www.youtube.com/embed/5-R39GNb1No",
            },
            {
                name: "Ачарья - фильм 2",
                href: "https://www.youtube.com/embed/tUPrAM7pPk8",
            },
            {
                name: "Ачарья - фильм 3",
                href: "https://www.youtube.com/embed/SA-OhXKvJuM",
            },
            {
                name: "Ачарья - фильм 4",
                href: "https://www.youtube.com/embed/4uAD4weomXI",
            },
            {
                name: "Ачарья - фильм 5",
                href: "https://www.youtube.com/embed/wZ-MKfmAMYQ",
            },
        ]
    },
    {
        name: "По стопам Шрилы Прабхупады Ачарьясборник Видеолекции Шрилы Прабхупады",
        list: [
            {
                name: "Программы в Мельбурне 1974 г.",
                href: "https://www.youtube.com/embed/Hos7ND4Z-J4",
            },
            {
                name: "Поездка на автомобиле июнь 1975 г.",
                href: "https://www.youtube.com/embed/QDHZ9acJOu4",
            },
            {
                name: "Лекция Наука о Боге",
                href: "https://www.youtube.com/embed/DmjscVUJ7l8",
            },
            {
                name: "Лекция в Венесуэле ",
                href: "https://www.youtube.com/embed/mpv7axHpf5g",
            },
            {
                name: "Лекция и вопросы",
                href: "https://www.youtube.com/embed/7eYMRhEJcMI",
            },
            {
                name: "Шримад-Бхагаватам 1.1.1",
                href: "https://www.youtube.com/embed/o0aAfqmwdtg",
            },
            {
                name: "Шримад-Бхагаватам 1.2.6",
                href: "https://www.youtube.com/embed/_B0N6MkpwO0",
            },
            {
                name: "Шримад-Бхагаватам 1.2.7",
                href: "https://www.youtube.com/embed/BxMTBJtY2CA",
            },
            {
                name: "О книге Бхагавад-гита как она есть",
                href: "https://www.youtube.com/embed/5MOD91m3jP8",
            },
            {
                name: "Бхагавад-гита 2.13 Нью-Йорк 1973 г.",
                href: "https://www.youtube.com/embed/LvjEAHz1IRY",
            },
            {
                name: "Бхагавад-гита 4.13 Нью-Йорк 1973 г.",
                href: "https://www.youtube.com/embed/TcMV0h3-okU",
            },
            {
                name: "Бхагавад-гита, система йоги 27.05.1972 г.",
                href: "https://www.youtube.com/embed/tP0n7OCrU9k",
            },
            {
                name: "ШБ 1.2.17",
                href: "https://www.youtube.com/embed/g8lza8OlJjc",
            },
            {
                name: "ШБ 1.2.18",
                href: "https://www.youtube.com/embed/jA7Y-4qCyPY",
            },
            {
                name: "ШБ 1.2.19",
                href: "https://www.youtube.com/embed/5wxPoJXRB6g",
            },
            {
                name: "ШБ 1.2.20",
                href: "https://www.youtube.com/embed/zWXXL2xc5gY",
            },
            {
                name: "ШБ 1.8.20",
                href: "https://www.youtube.com/embed/SP6vuot22w0",
            },
            {
                name: "ШБ 1.8.21",
                href: "https://www.youtube.com/embed/xYBCooo3OtE",
            },
            {
                name: "ШБ 1.8.23",
                href: "https://www.youtube.com/embed/y_jgv-q2mJ0",
            },
            {
                name: "ШБ 1.8.25",
                href: "https://www.youtube.com/embed/OxAReUUFwGQ",
            },
            {
                name: "ШБ 1.8.26",
                href: "https://www.youtube.com/embed/_TBYz1yFI34",
            },
            {
                name: "ШБ 1.8.28",
                href: "https://www.youtube.com/embed/NNb8uOpHIx0",
            },
            {
                name: "ШБ 1.8.29",
                href: "https://www.youtube.com/embed/ypdlDv6hDmA",
            },
            {
                name: "ШБ 1.8.30",
                href: "https://www.youtube.com/embed/RtuouwPUfNg",
            },
            {
                name: "ШБ 1.8.31",
                href: "https://www.youtube.com/embed/6OwkPQRvDnM",
            },
            {
                name: "ШБ 1.8.32",
                href: "https://www.youtube.com/embed/gwILylYFKKA",
            },
            {
                name: "ШБ 1.8.33",
                href: "https://www.youtube.com/embed/syg7kC1HT8c",
            },
            {
                name: "ШБ 1.8.35",
                href: "https://www.youtube.com/embed/RNiBWmxiHX4",
            },
            {
                name: "ШБ 1.14.43",
                href: "https://www.youtube.com/embed/IfsExqGUQQo",
            },
            {
                name: "ШБ 1.14.44",
                href: "https://www.youtube.com/embed/NCE18U4l9PA",
            },
            {
                name: "ШБ 1.15.1",
                href: "https://www.youtube.com/embed/v90pU62AzXI",
            },
            {
                name: "ШБ 2.1.1",
                href: "https://www.youtube.com/embed/WDHmD-IZNOg",
            },
            {
                name: "ШБ 2.2.6",
                href: "https://www.youtube.com/embed/0xJc6nOdHmQ",
            },
            {
                name: "ШБ 6.1.27",
                href: "https://www.youtube.com/embed/r0CY--WEmt0",
            },
            {
                name: "Беседа с директором соц. о обеспечения",
                href: "https://www.youtube.com/embed/Ny-WaEbUhw8",
            },
            {
                name: "Беседа с родителями Вайкунтханатхи",
                href: "https://www.youtube.com/embed/UtbMqe85Qrw",
            },
            {
                name: "Беседа остров Маврикий",
                href: "https://www.youtube.com/embed/k5lOHKHMZnw",
            },
            {
                name: "Кто такой Кришна - Бостон 1971 г.",
                href: "https://www.youtube.com/embed/4ux5QCUqxbU",
            },
            {
                name: "Лекция в университете Лэтроб",
                href: "https://www.youtube.com/embed/yaBDIhpJO9o",
            },
            {
                name: "Вопросы на тему Сознания Кришны",
                href: "https://www.youtube.com/embed/udkzoq8rIFs",
            },
            {
                name: "Лекция по прибытию в Питсбург 1972 г.",
                href: "https://www.youtube.com/embed/ynGYdEi16ck",
            },
            {
                name: "Вьяса Пуджа в Нью Вриндаване 1973 г.",
                href: "https://www.youtube.com/embed/Vn0aQUa1_70",
            },
            {
                name: "Выступление Шрилы Прабхупады",
                href: "https://www.youtube.com/embed/26EOKB4OlJw",
            },
            {
                name: "Лекция в день Ратха-ятра июнь 1974 г.",
                href: "https://www.youtube.com/embed/DUg88xI-qeA",
            },
            {
                name: "Лекция в день Ратха-ятра в Сан Франциско",
                href: "https://www.youtube.com/embed/kkXmMoqf8Zo",
            },
            {
                name: "Совершенные вопросы, совершенные ответы",
                href: "https://www.youtube.com/embed/BBz3hp8_wOA",
            },
        ]
    },
    {
        name: "Образы Шрилы Прабхупады",
        list: [
            {
                name: "Образы - фильм 1",
                href: "https://www.youtube.com/embed/MZ07OvVO4U8",
            },
            {
                name: "Образы - фильм 2",
                href: "https://www.youtube.com/embed/xU4FhM9TiE4",
            },
            {
                name: "Образы - фильм 3",
                href: "https://www.youtube.com/embed/Ot-3zAVM7DQ",
            },
            {
                name: "Образы - фильм 4",
                href: "https://www.youtube.com/embed/Xyn5g808nEs",
            },
            {
                name: "Образы - фильм 5",
                href: "https://www.youtube.com/embed/rvTTxprDauI",
            },
            {
                name: "Образы - фильм 6",
                href: "https://www.youtube.com/embed/aE8QbESny_Y",
            },
            {
                name: "Образы - фильм 7",
                href: "https://www.youtube.com/embed/V704rue7NKg",
            },
            {
                name: "Образы - фильм 8",
                href: "https://www.youtube.com/embed/CvtVDsd5QeI",
            },
        ]
    },
];
