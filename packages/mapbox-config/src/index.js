import mapboxGl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';

const token =
    'pk.eyJ1IjoicGF0cmlja3dqcyIsImEiOiJjanBxbThjbXQwcWRjM3hueDk5cW44NWk2In0.9tCql2RKeE6vEvZS1k1rmA';

const defaultStyle = 'mapbox://styles/mapbox/dark-v9';

mapboxGl.accessToken = token;

const { isIntranet, root_domain } = window.jusdaBaseConfig;

mapboxGl.config.API_URL = isIntranet
    ? `https://mp${root_domain}/mapbox`
    : 'https://www.jus-link.com/mapbox';

const defaultConfig = {
    style: 'mapbox://styles/patrickwjs/ck061iru21xn01cnw9sqpzppu',
    attributionControl: false,
    style: defaultStyle,
    zoom: 1.5,
};

function mapboxGlMap(config = {}, lang = 'zh') {
    let map = new mapboxGl.Map({
        ...defaultConfig,
        ...config,
    });
    const mapLang = new MapboxLanguage(lang);
    map.addControl(mapLang);
    return map;
}

export default {
    mapboxGl,
    mapboxGlMap,
    config: {
        token: token,
        defaultConfig,
        defaultStyle,
    },
};
