async function initMap() {
    await ymaps3.ready;

    const { YMap, YMapDefaultSchemeLayer, YMapMarker } = ymaps3;

    // --- Инициализация карты ---
    const map = new YMap(document.getElementById('map'), {
        location: { center: [68.964319, 33.048633], zoom: 10 },
        mode: 'vector'
    });

    // --- Слой с кастомизацией ---
    const layer = new YMapDefaultSchemeLayer({
        customization: [
            { tags: { any: ["transit"] }, elements: ["label.icon", "label.text"], stylers: { visibility: "off" } },
            { tags: { any: ["outdoor", "park", "cemetery", "medical"] }, elements: "label", stylers: { visibility: "off" } },
            { tags: { any: "poi", none: ["outdoor", "park", "cemetery", "medical"] }, stylers: { visibility: "off" } },
            { tags: { any: "road" }, types: "point", stylers: { visibility: "off" } },
            { tags: { any: ["food_and_drink", "shopping", "commercial_services"] }, stylers: { visibility: "off" } },
            { tags: { any: ["traffic_light", "entrance"] }, stylers: { visibility: "off" } }
        ]
    });
    map.addChild(layer);

    // --- Данные писателей ---
    const writers = {
        "Маслов Доска": { coords: [68.978532, 33.083732], name: { ru: "Маслов (мемориальная доска)", en: "Maslov (memorial plaque)" }, hint: { ru: "Мемориальная доска В.С. Маслову.\n(ул. Октябрьская, 23)", en: "Memorial plaque to V.S. Maslov.\n(Oktabrskaya St., 23)" } },
        "Маслов Бюст": { coords: [68.968733, 33.089311], name: { ru: "Маслов (бюст)", en: "Maslov (bust)" }, hint: { ru: "Бюст В.С. Маслову.\n(Капитана Буркова, 30)", en: "Bust of V.S. Maslov.\n(Kapitana Burkova St., 30)" } }
        // Добавь остальные писатели по аналогии
    };

    let placemarks = [];
    const clusterDistance = 0.02; // приблизительная дистанция кластера

    // --- Функция для создания метки ---
    function createPlacemark(writer) {
        const marker = new YMapMarker({
            location: writer.coords,
            properties: { hintContent: writer.hint.ru, iconContent: writer.name.ru },
        });
        marker.events.add('click', () => {
            const infoBox = document.getElementById('infoBox');
            infoBox.innerHTML = writer.hint.ru.replace(/\n/g, "<br>");
            infoBox.style.display = 'block';
            setTimeout(() => infoBox.style.display = 'none', 5000);
        });
        map.addChild(marker);
        return marker;
    }

    // --- Создание всех меток ---
    for (let key in writers) {
        placemarks.push({ key: key, writer: writers[key], marker: createPlacemark(writers[key]) });
    }

    // --- Dropdown ---
    const select = document.getElementById('writerSelect');
    select.innerHTML = '';
    let defaultOption = document.createElement('option');
    defaultOption.text = "Поиск";
    defaultOption.value = "";
    select.add(defaultOption);

    for (let key in writers) {
        let opt = document.createElement('option');
        opt.text = writers[key].name.ru;
        opt.value = key;
        select.add(opt);
    }

    select.addEventListener('change', () => {
        const key = select.value;
        if (writers[key]) {
            map.setCenter(writers[key].coords, 20, { duration: 500 });
        }
    });

    // --- Кластеризация (упрощённая) ---
    function clusterMarkers() {
        const zoom = map.getZoom();
        // Для каждого маркера проверяем близость к другим и объединяем
        // Реализуем базовую визуализацию: если zoom < 15, показываем только кластеры
        for (let pm of placemarks) pm.marker.options.set('visible', zoom >= 15);
    }

    map.events.add('boundschange', clusterMarkers);
}

// --- Обновление языка ---
function setLang(lang) {
    for (let pm of placemarks) {
        pm.marker.properties.set('iconContent', pm.writer.name[lang]);
        pm.marker.properties.set('hintContent', pm.writer.hint[lang]);
    }
    for (let i = 1; i < select.options.length; i++) {
        const key = select.options[i].value;
        select.options[i].text = writers[key].name[lang];
    }
}

// --- Тема карты ---
function setTheme(isDark) {
    const mapContainer = document.getElementById('map');
    if (isDark) mapContainer.classList.add('dark-theme');
    else mapContainer.classList.remove('dark-theme');
}

document.addEventListener("DOMContentLoaded", initMap);
