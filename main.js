document.addEventListener("DOMContentLoaded", () => {
    var map = new maplibregl.Map({
        container: 'map', // container id
        style: {
            version: 8,
            sources: {},
            layers: []
        }, // style URL
        center: [0, 0], // starting position [lng, lat]
        zoom: 1 // starting zoom
    });

    map.on('load', () => {
        map.addSource(
            'countries', {
            type: 'geojson',
            data: './data/ne_50m_admin_0_countries.geojson'
        });
        map.addLayer({
            id: 'countries-layer',
            source: 'countries',
            type: 'fill',
            paint: {
                'fill-color': [
                    'step',
                    ['get', 'pop_est'],
                    '#FF0000',
                    10000000,
                    '#00FF00',
                    100000000,
                    '#0000FF'
                ],
                'fill-outline-color': '#360D5B',
            }
        });
        map.addLayer({
            id: 'countries-board-layer',
            source: 'countries',
            type: 'line',
            paint: {
                'line-color': '#360D5B',
                'line-width': 1,
            }
        });
        map.addSource(
            'lakes', {
            type: 'geojson',
            data: './data/ne_50m_lakes.geojson'
        });
        map.addLayer({
            id: 'lakes-layer',
            source: 'lakes',
            type: 'fill',
            paint: {
                'fill-color': '#70ACBB',
                'fill-outline-color': '#0A404D'
            }
        });
        map.addSource(
            'rivers', {
            type: 'geojson',
            data: './data/ne_50m_rivers_lake_centerlines_scale_rank.geojson'
        });
        map.addLayer({
            id: 'rivers-layer',
            source: 'rivers',
            type: 'line',
            paint: {
                'line-color': '#206676'
            }
        });
        map.addSource(
            'cities', {
            type: 'geojson',
            data: './data/ne_50m_populated_places.geojson'
        });
        map.addLayer({
            id: 'cities-layer',
            source: 'cities',
            type: 'circle',
            paint: {
                'circle-color': '#A62500',
                'circle-radius': 4,
            },
            filter: ['>',['get','POP_MAX'], 2000000]
        });
        
        map.on('click','cities-layer', (e) => {
            new maplibregl.Popup().setLngLat(e.lngLat).setHTML(`${e.features[0].properties.NAME}<br>${e.features[0].properties.POP_MAX} чел.`).addTo(map)
            console.log(e.features[0].properties.POP_MAX)
        });

        map.on('click','countries-layer', (e) => {
            console.log(e.features[0].properties.POP_MAX)
        });

        map.on('mouseenter', 'cities-layer', () => {
            map.getCanvas().style.cursor = 'pointer'
        });

        map.on('mouseleave', 'cities-layer', () => {
            map.getCanvas().style.cursor = ''
        });
    })
})
