ymaps3.ready.then(() => {
    const { YMapDefaultSchemeLayer } = ymaps3.layer;

    const map = new ymaps3.Map(document.getElementById('map'), {
        location: {
            center: [37.617635, 55.755814], // Москва
            zoom: 10,
            mode: 'vector'
        }
    });

    const layer = new YMapDefaultSchemeLayer({
        customization: [
            {
                tags: { any: ["transit"] },
                elements: ["label.icon", "label.text"],
                stylers: { visibility: "off" }
            },
            {
                tags: { any: ["outdoor", "park", "cemetery", "medical"] },
                elements: "label",
                stylers: { visibility: "off" }
            },
            {
                tags: { any: "poi", none: ["outdoor", "park", "cemetery", "medical"] },
                stylers: { visibility: "off" }
            },
            {
                tags: { any: "road" },
                types: "point",
                stylers: { visibility: "off" }
            },
            {
                tags: { any: ["food_and_drink", "shopping", "commercial_services"] },
                stylers: { visibility: "off" }
            },
            {
                tags: { any: ["traffic_light"] },
                stylers: { visibility: "off" }
            },
            {
                tags: { any: ["entrance"] },
                stylers: { visibility: "off" }
            },
            {
                tags: { any: ["road"], none: ["road_1", "road_2", "road_3", "road_4", "road_5", "road_6", "road_7"] },
                elements: "label.icon",
                stylers: { visibility: "off" }
            },
            {
                tags: { any: ["road"] },
                stylers: { visibility: "off" }
            },
            {
                tags: { any: ["road_3", "road_4"] },
                stylers: { visibility: "off" }
            },
            {
                tags: { any: ["road_5", "road_6"] },
                stylers: { visibility: "off" }
            },
            {
                tags: { any: ["road_7"] },
                stylers: { visibility: "off" }
            },
            {
                tags: { any: ["road_construction", "road_minor", "road_unclassified", "path", "road_limited"] },
                stylers: { visibility: "off" }
            },
            {
                tags: { any: ["transit"] },
                stylers: { visibility: "off" }
            }
        ]
    });

    map.addChild(layer);
});
