var map;
let currentLang = "ru"; // ru или en
let infoTimeout; // для сброса таймера инфобокса

// --- Писатели с переводами ---
var writers = {
    "Маслов Доска": {
        coords: [68.978532, 33.083732],
        name: { ru: "Маслов (мемориальная доска)", en: "Maslov (memorial plaque)" },
        hint: {
            ru: "Мемориальная доска В.С. Маслову.\nЗдесь жил и работал писатель.\n(ул. Октябрьская, 23)",
            en: "Memorial plaque to V.S. Maslov.\nThe writer lived and worked here.\n(Oktabrskaya St., 23)"
        }
    },
    "Маслов Бюст": {
        coords: [68.968733, 33.089311],
        name: { ru: "Маслов (бюст)", en: "Maslov (bust)" },
        hint: {
            ru: "Бюст В.С. Маслову.\nМурманская областная детско-юношеская библиотека имени В.П. Махаевой.\n(Капитана Буркова, 30)",
            en: "Bust of V.S. Maslov.\nMurmansk Regional Children's and Youth Library named after V.P. Makhaeva.\n(Kapitana Burkova St., 30)"
        }
    },
    "Колычев": {
        coords: [68.969108, 33.089312],
        name: { ru: "Колычев (бюст)", en: "Kolychev" },
        hint: {
            ru: "Бюст Н.В. Колычеву.\nМурманская областная детско-юношеская библиотека имени В.П. Махаевой.\n(Капитана Буркова, 30)",
            en: "Bust of N.V. Kolychev.\nMurmansk Regional Children's and Youth Library named after V.P. Makhaeva.\n(Kapitana Burkova St., 30)"
        }
    },
    "Тимофеев Памятник": {
        coords: [68.9998112, 33.0642881],
        name: { ru: "Тимофеев (памятник)", en: "Timofeev (monument)" },
        hint: {
            ru: "Памятник \"Ждущая\".\nВ основе идеи памятника — героиня поэмы \"Сентиментальная вахта\".\n(ул. Чумбарова-Лучинского)",
            en: "Monument \"The Waiting Woman\".\nInspired by the heroine of the poem \"Sentimental Watch\".\n(Chumbarova-Luchinskogo St.)"
        }
    },
    "Тимофеев Доска": {
        coords: [68.971065, 33.106926],
        name: { ru: "Тимофеев (мемориальная доска)", en: "Timofeev (memorial plaque)" },
        hint: {
            ru: "Мемориальная доска В.Л. Тимофееву.\n(ул. Капитана Маклакова, 45)",
            en: "Memorial plaque to V.L. Timofeev.\n(Kapitana Maklakova St., 45)"
        }
    },
    "Тимофеев Бюст": {
        coords: [68.969070, 33.089320],
        name: { ru: "Тимофеев (бюст)", en: "Timofeev (bust)" },
        hint: {
            ru: "Бюст В.Л. Тимофееву.\nМурманская областная детско-юношеская библиотека имени В.П. Махаевой.\n(Капитана Буркова, 30)",
            en: "Bust of V.L. Timofeev.\nMurmansk Regional Children's and Youth Library named after V.P. Makhaeva.\n(Kapitana Burkova St., 30)"
        }
    },
    "Воронова1": {
        coords: [67.942408, 34.554809],
        name: { ru: "Воронова 1", en: "Voronova 1" },
        hint: {
            ru: "Музей саамской литературы и письменности имени Октябрины Вороновой.\n(ул. Победы, 25)",
            en: "Museum of Sámi Literature and Writing named after Oktyabrina Voronova.\n(Pobedy St., 25)"
        }
    },
    "Воронова2": {
        coords: [67.941567, 34.554250],
        name: { ru: "Воронова 2", en: "Voronova 2" },
        hint: {
            ru: "Мемориальная доска Октябрины Вороновой.\n(ул. Победы, 25)",
            en: "Memorial plaque of Oktyabrina Voronova.\n(Pobedy St., 25)"
        }
    },
    "Скромный библиотека": {
        coords: [68.978, 33.085],
        name: { ru: "Скромный (библиотека)", en: "Skromny (library)" },
        hint: {
            ru: "Библиотека №1. Мини-музей Николая Александровича Скромного.\n(ул. Буркова, 30)",
            en: "Library No.1. Mini-museum of Nikolay Alexandrovich Skromny.\n(Burkova St., 30)"
        }
    },
    "Скромный Бюст": {
        coords: [68.969032, 33.089308],
        name: { ru: "Скромный (бюст)", en: "Skromny (bust)" },
        hint: {
            ru: "Бюст Н.А. Скромному.\nМурманская областная детско-юношеская библиотека имени В.П. Махаевой.\n(Капитана Буркова, 30)",
            en: "Bust of N.A. Skromny.\nMurmansk Regional Children's and Youth Library named after V.P. Makhaeva.\n(Kapitana Burkova St., 30)"
        }
    },
    "Орешета Доска": {
        coords: [69.400, 33.066],
        name: { ru: "Орешета (мемориальная доска)", en: "Oresheta (memorial plaque)" },
        hint: {
            ru: "На острове Шалим (бывший посёлок Порт-Владимир) установлена мемориальная доска М.Г. Орешета",
            en: "On Shalim Island (former settlement Port-Vladimir) a memorial plaque to M.G. Oresheta is installed"
        }
    },
    "Орешета Бюст": {
        coords: [68.968985, 33.089311],
        name: { ru: "Орешета (бюст)", en: "Oresheta (bust)" },
        hint: {
            ru: "Бюст М.Г. Орешета.\nМурманская областная детско-юношеская библиотека имени В.П. Махаевой.\n(Капитана Буркова, 30)",
            en: "Bust of M.G. Oresheta.\nMurmansk Regional Children's and Youth Library named after V.P. Makhaeva.\n(Kapitana Burkova St., 30)"
        }
    },
    "Баёв": {
        coords: [69.165681, 35.138834],
        name: { ru: "Баёв", en: "Bayov" },
        hint: {
            ru: "Мемориальная доска Константину Ивановичу Баёву.\n(ул. 1-я Пятилетка, 14)",
            en: "Memorial plaque to Konstantin Ivanovich Bayov.\n(1-ya Pyatiletka St., 14)"
        }
    },
    "Подстаницкий Доска": {
        coords: [68.9949, 33.0624],
        name: { ru: "Подстаницкий (мемориальная доска)", en: "Podstanitsky (memorial plaque)" },
        hint: {
            ru: "Мемориальная доска А.И. Подстаницкого.\n(ул. Подстаницкого, 8)",
            en: "Memorial plaque to A.I. Podstanitsky.\n(Podstanitskogo St., 8)"
        }
    },
    "Подстаницкий Бюст": {
        coords: [68.968929, 33.089308],
        name: { ru: "Подстаницкий (бюст)", en: "Podstanitsky (bust)" },
        hint: {
            ru: "Бюст А.И. Подстаницкому.\nМурманская областная детско-юношеская библиотека имени В.П. Махаевой.\n(Капитана Буркова, 30)",
            en: "Bust of A.I. Podstanitsky.\nMurmansk Regional Children's and Youth Library named after V.P. Makhaeva.\n(Kapitana Burkova St., 30)"
        }
    },
    "Смирнов Доска": {
        coords: [68.97505, 33.086938],
        name: { ru: "Смирнов (мемориальная доска)", en: "Smirnov (memorial plaque)" },
        hint: {
            ru: "Мемориальная доска В.Л. Смирнову.\n(Рыбный проезд, 8)",
            en: "Memorial plaque to V.L. Smirnov.\n(Rybny Proezd, 8)"
        }
    },
    "Смирнов Бюст": {
        coords: [68.968864, 33.089305],
        name: { ru: "Смирнов (бюст)", en: "Smirnov (bust)" },
        hint: {
            ru: "Бюст В.А. Смирнову.\nМурманская областная детско-юношеская библиотека имени В.П. Махаевой.\n(Капитана Буркова, 30)",
            en: "Bust of V.A. Smirnov.\nMurmansk Regional Children's and Youth Library named after V.P. Makhaeva.\n(Kapitana Burkova St., 30)"
        }
    },
    "Рубцов Аппатиты": {
        coords: [67.563700, 33.420275],
        name: { ru: "Рубцов (Аппатиты)", en: "Rubtsov (Appatity)" },
        hint: {
            ru: "Мемориальная доска Н.М. Рубцову.\n(ул. Ленина, 24А)",
            en: "Memorial plaque to N.M. Rubtsov.\n(Lenin St., 24A)"
        }
    },
    "Рубцов Кировск": {
        coords: [67.611223, 33.673566],
        name: { ru: "Рубцов (Кировск)", en: "Rubtsov (Kirovsk)" },
        hint: {
            ru: "Мемориальная доска в честь образования Кировского горного техникума.\n(Рубцов)",
            en: "Memorial plaque dedicated to the founding of the Kirovsk Mining College.\n(Rubtsov)"
        }
    },
    "Рубцов Бюст": {
        coords: [68.968800, 33.089302],
        name: { ru: "Рубцов (бюст)", en: "Rubtsov (bust)" },
        hint: {
            ru: "Бюст Н.М. Рубцову.\nМурманская областная детско-юношеская библиотека имени В.П. Махаевой.\n(Капитана Буркова, 30)",
            en: "Bust of N.M. Rubtsov.\nMurmansk Regional Children's and Youth Library named after V.P. Makhaeva.\n(Kapitana Burkova St., 30)"
        }
    }
};


var placemarks = {};
var clusterer;

function init() {
    map = new ymaps.Map('map', {
        center: [68.964319, 33.048633],
        zoom: 10,
        type: 'yandex#map'
    }, {
        restrictMapArea: [
            [66.141938, 26.980456],
            [69.988776, 41.645175]
        ],
        minZoom: 3,
        yandexMapDisablePoiInteractivity: true
    });

    map.panes.get('copyrights').getElement().style.display = 'none';

    ['geolocationControl','searchControl','trafficControl','typeSelector','fullscreenControl','zoomControl','rulerControl']
        .forEach(c => map.controls.remove(c));

    // --- Кластерер ---
    clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: false,
        clusterIconLayout: ymaps.templateLayoutFactory.createClass(
            '<div style="display:flex;align-items:center;">' +
            '<div class="number-cluster">$[properties.geoObjects.length]</div>' +
            '<img src="img/museum.png" style="width:40px;height:40px; margin-bottom:7px;">' +
            '</div>'
        )
    });

    // --- Создаём метки ---
    for (let key in writers) {
        let writer = writers[key];

        let placemark = new ymaps.Placemark(writer.coords, {
            hintContent: writer.hint[currentLang],
            iconContent: writer.name[currentLang]
        }, {
            preset: 'islands#redStretchyIcon',
            iconColor: '#1976D2'
        });

        // Клик по метке
        placemark.events.add('click', function() {
            const infoBox = document.getElementById('infoBox');
            if (!infoBox) return;

            clearTimeout(infoTimeout);

            infoBox.innerHTML = writer.hint[currentLang].replace(/\n/g, "<br>");
            infoBox.style.display = 'block';
            infoBox.style.opacity = '1';

            infoTimeout = setTimeout(function() {
                infoBox.style.opacity = '0';
                setTimeout(() => infoBox.style.display = 'none', 300);
            }, 5000);
        });

        placemarks[key] = placemark;
        clusterer.add(placemark);
    }

    map.geoObjects.add(clusterer);

    // --- Селект выбора писателя ---
    var select = document.getElementById('writerSelect');
    select.innerHTML = ''; // очищаем старые опции
    var defaultOption = document.createElement('option');
    defaultOption.text = (currentLang === "en") ? "Search" : "Поиск";
    defaultOption.value = "";
    select.add(defaultOption);

    for (let key in writers) {
        let opt = document.createElement('option');
        opt.text = writers[key].name[currentLang];
        opt.value = key;
        select.add(opt);
    }

    select.addEventListener('change', function () {
        var name = select.value;
        if (writers[name]) {
            map.setCenter(writers[name].coords, 20, { duration: 500 });
        }
    });

    // --- Изменение внешнего вида меток при зуме ---
   map.events.add('boundschange', function() {
       let zoom = map.getZoom();

       for (let key in placemarks) {
           let pm = placemarks[key];

           if (zoom < 10) {
               // Мини-кластер с цифрой 1
               pm.options.set('iconLayout', ymaps.templateLayoutFactory.createClass(
                   '<div style="display:flex;align-items:center;">' +
                   '<div class="number-cluster">1</div>' +
                   '<img src="img/museum.png" style="width:40px;height:40px;margin-bottom:7px;">' +
                   '</div>'
               ));
               pm.properties.set('iconContent', "");
           } else {
               // Возвращаем стандартный пресет
               pm.options.unset('iconLayout');
               pm.options.set('preset', 'islands#redStretchyIcon');
               pm.properties.set('iconContent', writers[key].name[currentLang]);
           }
       }

       if (zoom >= 15) {
           // Показываем метки индивидуально
           if (map.geoObjects.indexOf(clusterer) !== -1) map.geoObjects.remove(clusterer);
           for (let key in placemarks) {
               if (map.geoObjects.indexOf(placemarks[key]) === -1) map.geoObjects.add(placemarks[key]);
           }
       } else {
           // Включаем кластер
           for (let key in placemarks) {
               if (map.geoObjects.indexOf(placemarks[key]) !== -1) map.geoObjects.remove(placemarks[key]);
           }
           if (map.geoObjects.indexOf(clusterer) === -1) map.geoObjects.add(clusterer);
       }
   });
}

function setMapTheme(isDark) {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    if (isDark) {
        mapContainer.classList.add('dark-theme');
    } else {
        mapContainer.classList.remove('dark-theme');
    }
}

function setTheme(isDark) {
    const mapContainer = document.getElementById('map');
    const writerSelect = document.getElementById('writerSelect');
    writerSelect.style.visibility = "visible";
    if (isDark) {
        writerSelect.style.backgroundColor = 'grey';
        writerSelect.style.color = 'white';
    } else {
        writerSelect.style.backgroundColor = '#F0F4F8';
        writerSelect.style.color = 'black';
    }
}

// --- Переключение языка ---
function setLang(lang) {
    currentLang = (lang === "English") ? "en" : "ru";

    // Обновляем заголовок карты
    var label = document.querySelector('.fixed-label');
    if (label) label.textContent = (currentLang === "en") ? "Murmansk Region Map" : "Карта Мурманской области";

    // Обновляем метки
    for (let key in placemarks) {
        placemarks[key].properties.set('iconContent', writers[key].name[currentLang]);
        placemarks[key].properties.set('hintContent', writers[key].hint[currentLang]);
    }

    // Обновляем dropdown
    var select = document.getElementById('writerSelect');
    if (select) {
        // Сначала меняем первый элемент
        select.options[0].text = (currentLang === "en") ? "Select a writer" : "Выберите писателя";

        // Остальные элементы
        let i = 1;
        for (let key in writers) {
            select.options[i].text = writers[key].name[currentLang];
            i++;
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    ymaps.ready(init);
});
