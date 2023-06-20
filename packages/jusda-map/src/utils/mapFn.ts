/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as turf from '@turf/turf';
import MapBoxConfig from '@jusda-tools/mapbox-config';
import { getLocaleFn } from './fn';

const MapBoxGL = MapBoxConfig.mapboxGl;

const defaultOpt: any = {
    style: 'mapbox://styles/patrickwjs/cl426zos4000w15o4267ef82v',
    center: [116.3972282409668, 39.90960456049752],
    zoom: 5,
    attributionControl: false,
};

export default MapBoxGL;

export function CreateMap(option: any) {
    if (!option || !option.container) return false;
    const lang = getLocaleFn();
    const map = MapBoxConfig.mapboxGlMap(
        {
            ...defaultOpt,
            ...option,
            style: lang === 'zh-CN' ? defaultOpt?.style : 'mapbox://styles/patrickwjs/ck061iru21xn01cnw9sqpzppu',
        },
        // {
        //   // defaultLanguage: lang === "zh-CN" ? "zh" : "en"
        //   defaultLanguage: 'zh-Hans'
        // }
    );
    return map;
}

// 获取坐标，如果经度为负数，直接加上360，保证路径等在负经度时候能正常连接
export function getLnglat(p: any) {
    if (!p) return [];
    return [p[0] < 0 ? 360 + p[0] : p[0], p[1]];
}
// 获取坐标，如果经度为负数，直接加上360，保证路径等在负经度时候能正常连接
export function getLnglatList(p: any[]) {
    if (!p) return [];
  let arr= p.map((item)=>{
    return [item[0] < 0 ? 360 + item[0] : item[0], item[1]];
    })
   return arr
} 
/**
 * 判断当前的坐标符合[lng, lat]格式
 * @param {array} line: [lng, lat]
 */
export function isLngLat(lnglat: any) {
    return lnglat && lnglat.length >= 2 && lnglat[0] !== null && lnglat[1] !== null;
}
export function getDrivingPath(routing: any) {
    const a = turf.lineString(routing.line);
    return Promise.resolve({
        line: a?.geometry?.coordinates,
        routing,
    });
}
// 创建路线对应的数据格式
export function greatCircle(routing: any) {
    const p = routing.line.reduce(
        (r: any, l: any) => ({
            start: r.start || l,
            end: l,
        }),
        {
            start: null,
            end: null,
        },
    );
    const start = turf.point(p.start);
    const end = turf.point(p.end);
    const greatCircle = turf.greatCircle(start, end) || { geometry: { type: '' } };
    let path: any = greatCircle?.geometry?.coordinates;
    //@ts-ignore
    if (greatCircle?.geometry?.type === 'MultiLineString') {
        path = path?.flat().map((p1: any) => {
            return [p1[0] < 0 ? 360 + p1[0] : p1[0], p1[1]];
        });
    }
    return path;
}

// 依据传递的路径信息，显示页面展示的范围
export function fitbounds(map: any, paths: any, padd = {}) {
    const bounds = new MapBoxGL.LngLatBounds(paths[0], paths[0]);
    paths.forEach((p: any) => {
        bounds.extend(MapBoxGL.LngLat.convert(p));
    });
    const padding = {
        top: 50,
        left: 50,
        bottom: 50,
        right: 50,
        ...padd,
    };
    map.fitBounds(
        bounds,
        {
            padding,
            maxZoom: 10,
        },
        {
            after: 'fit',
        },
    );
}
export function getRoute(routing) {
    switch (routing.modeCode) {
      case "TPM_LAND":
        return getDrivingPath(routing);
      case "TPM_COMBO":
        return getDrivingPath(routing);
      case "TPM_EXPRESS":
        return getDrivingPath(routing);
      case "TMP_TRUCK":
        return getDrivingPath(routing);
      case "TPM_RAIL":
        return getDrivingPath(routing);
      case "TPM_AIR":
        return getPlanePath(routing);
      case "TPM_SEA":
        return getSeaPath(routing);
      case "TPM_ROAD":
        return getDrivingPath(routing);
      default:
        return getPlanePath(routing);
    }
  }
// 获取飞机的路线
export function getPlanePath(routing) {
    return Promise.resolve({
      line: greatCircle(routing),
      routing
    });
  }
  
  // 获取海运的路线
  export function getSeaPath(routing) {
    const a = turf.lineString(routing.line);
    return Promise.resolve({
      line: a?.geometry?.coordinates,
      routing
    });
  }
