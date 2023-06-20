/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import * as turf from "@turf/turf";
import MapBoxGL, { CreateMap, fitbounds, getLnglat, isLngLat, greatCircle ,getLnglatList} from '../../utils/mapFn';
import AMapLoader from '@amap/amap-jsapi-loader';
import RouteComp from '../RouteComp';
// import RePlay from '../RePlay';
import language from '../../locales/index';
import change from '../../assets/img/change.png';
import './index.less';

export default (props: any) => {
    const {
        originToDestination,//起始地-目的地对象
        trcks,//轨迹坐标列表
        routings = [],//运段列表
        curMap: current,//当前地图
        AMapKey,//高德-key
        changeMap,//切换地图
        routingsCoordinate,//运段坐标列表
        distance,//剩余里程
        modeCode,//运输模式
        isWaybill,//判断运单和运端
        scrollHight,//出现滚动条高度
        // 轨迹回放
        downloadRoute = () => { },//下载轨迹方法
        DownLoading,//下载按钮loading状态
        ReplayRoutes,//筛选后符合要求的运段
        BtndDisabled,//下载按钮是否禁用
        SelRoute, // 选中的运段
        metaDataPropertyList
    } = props;
    const { originName, destinationName } = originToDestination || {}
    const origin = getLnglat(originToDestination?.origin)
    const destination = getLnglat(originToDestination?.destination)
    const [curMap, setcurMap] = useState(current);//当前地图
    const [amapDom, setAmapDom] = useState();//高德实例
    const [AMap, setAMap] = useState();//
    const [mapboxDom, setMapboxDom]: any = useState();//mapbox实例
    //加载高德地图
    useEffect(() => {
        LoadAmap()
    }, []);
    // 根据配置渲染对应地图

    useEffect(() => {
        if (!curMap && !amapDom && AMap) {
            InitAMap(AMap)//初始化地图 高德
        }
        if (curMap && !mapboxDom) {
            InitMapBox()//初始化地图 mapbox
        }
    }, [curMap, AMap]);
    const LoadAmap = () => {
        AMapLoader.load({
            key: AMapKey, // 申请好的Web端开发者Key，首次调用 load 时必填
            version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: [
                "AMap.MarkerClusterer",
                "AMap.ControlBar",
                "AMap.MoveAnimation",
                "AMap.Driving"
            ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap: any) => {
            setAMap(AMap)
        })
    }

    // 高德地图加载 起始地-目的地
    useEffect(() => {
        if (originToDestination && amapDom) {
            drawAmap(amapDom, AMap)
        }
    }, [originToDestination, amapDom]);

    // 高德地图绘制运段
    useEffect(() => {
        if (routingsCoordinate && routingsCoordinate.length !== 0 && amapDom) {
            drawRoutings({ map: amapDom, AMap, type: 'amap' })
        }
    }, [routingsCoordinate, amapDom]);

    // 高德地图绘制轨迹
    useEffect(() => {
        if (trcks && amapDom) {
            trcks.forEach((item:any[],index:number) => {
                drawTrcks({ line: getLnglatList(item), AMap, map: amapDom, type: 'amap',id:`amapDom${index}` }) //绘制轨迹
            });
            // drawTrcks({ line: trcks, AMap, map: amapDom, type: 'amap',id:"ssss2s" })//绘制轨迹
            // drawTrcks({ line: path, AMap, map: amapDom, type: 'amap' ,id:"sssss"})//绘制轨迹
            // drawTrcks({ line: trcks, AMap, map: amapDom, type: 'amap' })
            
        }
    }, [trcks, amapDom]);

    //高德地图 根据起终点经纬度规划驾车导航路线
    // useEffect(() => {
    //     if (distance && trcks && amapDom) {
    //         const lastporint = trcks.slice(-1)[0];
    //         // const LngLat = lastporint.slice(0, 2);
    //         // addMarker({ map: amapDom, AMap, className: "nowmarke", coordinate: LngLat, portCode: "", type: 'amap' });
    //         // addTimeLftMarker({ AMap, amap: amapDom, coordinate: LngLat })
    //     }
    // }, [trcks, distance, amapDom]);

    // mapbox地图加载 起始地-目的地
    useEffect(() => {
        if (originToDestination && mapboxDom) {
            drawMapBox(mapboxDom)
        }
    }, [originToDestination, mapboxDom]);

    // mapbox绘制运段
    useEffect(() => {
        if (routingsCoordinate && routingsCoordinate.length !== 0 && mapboxDom) {
            drawRoutings({ map: mapboxDom, type: 'mapbox' })//绘制运段
        }
    }, [routingsCoordinate, mapboxDom]);

    // mapbox绘制轨迹
    useEffect(() => {
        if (trcks && mapboxDom) {
            trcks.forEach((item:any[],index:number) => {
                drawTrcks({ line: getLnglatList(item), AMap, map: mapboxDom, type: 'mapbox',id:`mapboxDom${index}` }) //绘制轨迹
            });

            // drawTrcks({ line: trcks, map: mapboxDom, type: 'mapbox',id:"ssss2s" })//绘制轨迹
        }
    }, [trcks, mapboxDom]);

    //mapbox 根据起终点经纬度规划驾车导航路线
    useEffect(() => {
        if (distance && trcks && mapboxDom) {
            const lastporint = trcks.slice(-1)[0];
            const LngLat = lastporint.slice(0, 2);
            // addMarker({ map: mapboxDom, className: "nowmarke", coordinate: LngLat, portCode: "", type: 'mapbox' });
            // addTimeLftMarker({ mapboxDom, coordinate: LngLat })
        }
    }, [trcks, distance, mapboxDom]);
    // 连接起点终点的线
    const FormToDashRote = (index: any) => {
        return {
            id: `FormToDash${index}`,
            type: 'line',
            source: `FormTo${index}`,
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': '#ffc500',
                'line-width': 5,
                'line-opacity': 0.8,
            },
        };
    };
    // 高德地图绘制 起始地-目的地
    const drawAmap = (amap: any, AMap: any) => {
        if (origin && isLngLat(origin)) {
            //添加起点坐标
            addMarker({ map: amap, AMap, type: 'amap', className: 'startMarker', coordinate: origin, portCode: originName });
        }
        if (destination && isLngLat(destination)) {
            //添加终点坐标
            addMarker({ map: amap, AMap, type: 'amap', className: 'endMarker', coordinate: destination, portCode: destinationName });
        }
        //起始地/目的地连线
        if (origin && isLngLat(origin) && destination && isLngLat(destination)) {
            const mybounds = new AMap.Bounds(
                origin[0],
                origin[1],
                destination[0],
                destination[1]
            );

            amap.setBounds(mybounds, false, [50, 250, 50, 50]); //设置地图展示范围


        }
    }
    //mapbox地图绘制 起始地-目的地
    const drawMapBox = async (mapbox: any) => {
        if (origin && isLngLat(origin)) {
            //添加起点坐标
            addMarker({ map: mapbox, type: 'mapbox', className: 'startMarker', coordinate: origin, portCode: originName });
        }
        if (destination && isLngLat(destination)) {
            //添加终点坐标
            await addMarker({ map: mapbox, type: 'mapbox', className: 'endMarker', coordinate: destination, portCode: destinationName });
            if (origin && isLngLat(origin)) {
                // 使用起点和终点坐标来圈定展示范围
                const r = [origin, destination].filter(
                    (p) => p?.length > 1,
                );
                if (r?.length > 1) {
                    fitbounds(mapbox, r, { bottom: 250 });
                }

            }
        }
    };

    //初始化地图 高德
    const InitAMap = async (AMap: any) => {
        const amap = new AMap.Map('DialogAMap', {
            mapStyle: 'amap://styles/whitesmoke', //设置地图的显示样式
        })
        setAmapDom(amap)
    };
    //初始化地图 mapbox
    const InitMapBox = async () => {
        //获取dom对象，
        const container = document.getElementById('DialogMapBox');
        const mapbox = await CreateMap({ container });
        setMapboxDom(mapbox)
    };
    //绘制运段 
    const drawRoutings = async ({ map, AMap, type }: any) => {
        if (type === 'amap') {
            const markerList = routingsCoordinate.map((item: any, index: any) => {
                // 将创建的点标记添加到已有的地图实例：
                if(!item.destinationCoordinate[0]||!item.destinationCoordinate[1]){
                    return new AMap.Marker({
     
                    });
                }
                return new AMap.Marker({
                    position: new AMap.LngLat(
                        getLnglat(item.destinationCoordinate)[0],
                        getLnglat(item.destinationCoordinate)[1],
                    ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    // title: `${index}`,
                    content: getMaker({ className: 'startMarker', index: index + 1 }), // 自定义点标记覆盖物内容
                    offset: new AMap.Pixel(-20, -25), // 相对于基点的偏移位置
                });
            });
            map.add(markerList);
            //批量生成运段连线
            // for (let index = 0; index < routingsCoordinate.length; index++) {
            //     let item = routingsCoordinate[index];
            //     let path = [
            //         new AMap.LngLat(getLnglat(item.originCoordinate)[0], getLnglat(item.originCoordinate)[1]),
            //         new AMap.LngLat(getLnglat(item.destinationCoordinate)[0], getLnglat(item.destinationCoordinate)[1]),
            //     ];
            //     // 创建折线实例
            //     let polyline = new AMap.Polyline({
            //         path: path,
            //         borderWeight: 5, // 线条宽度，默认为 1
            //         strokeColor: '#ffc500', // 线条颜色
            //         lineJoin: 'round', // 折线拐点连接处样式
            //     });
            //     // 将折线添加至地图实例
            //     map.add(polyline);
            // }
        } else {
            for (let index = 0; index < routingsCoordinate.length; index++) {
                const element = routingsCoordinate[index];
                //标记运段终点
                if(element.destinationCoordinate[0]&&element.destinationCoordinate[1]){
                    addMarker({
                        map,
                        className: 'startMarker',
                        coordinate: element.destinationCoordinate,
                        index: index + 1,
                    });
                    const r = [getLnglat(element.originCoordinate), getLnglat(element.destinationCoordinate)].filter(
                        (p) => p.length > 1,
                    );
                    
                }
          
         
                // const FormToLine = {
                //     type: 'FeatureCollection',
                //     features: [
                //         {
                //             type: 'Feature',
                //             geometry: {
                //                 type: 'LineString',
                //                 coordinates: greatCircle({ line: r }),
                //             },
                //         },
                //     ],
                // };
                // map.on('load', () => {
                //     //添加运段连线
                //     map?.addSource(`FormTo${index}`, {
                //         type: 'geojson',
                //         data: FormToLine,
                //     });
                //     map?.addLayer(FormToDashRote(index));
                // })
            }
        }
    };

    //绘制轨迹
    const drawTrcks = ({ line, AMap, map, type ,id='routeLayer'}: any) => {
        map.on('load', () => {
            map.addLayer({
                id,
                'type': 'line',
                'source': {
                    'type': 'geojson',
                    'lineMetrics': true,
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [{
                            'type': 'Feature',
                            'geometry': {
                                'type': 'LineString',
                                'coordinates': line
                            }
                        }]
                    }
                },
                'paint': {
                    "line-color": "#ffc500",
                    "line-width": 5,
                    "line-opacity": 0.6,
                },
                layout: {
                    'line-cap': 'round',
                    'line-join': 'round',
                },
            });
        });
     if(type==='amap'){
        new AMap.Polyline({  
            'lineCap': 'round',
            lineJoin: 'round',
            map:map,  
            path:line,  
            strokeColor:"#ffc500",//线颜色  
            strokeOpacity:0.6,//线透明度  
            strokeWeight:5,//线宽  
            strokeStyle:"solid",//线样式  
        }); 
     } 

    };
    // 添加剩余公里数
    const addTimeLftMarker = async ({ AMap, amap, mapbox }: any) => {
        const content = document.createElement('div');
        const inner = document.createElement('div');
        const port = document.createElement('div');
        content.className = 'timeLeft';
        inner.className = 'inner';
        port.className = 'closeButton';
        port.innerHTML = "X";
        inner.innerHTML = distance
        content.appendChild(inner);
        content.appendChild(port);
        // 点击隐藏
        port.addEventListener("click", () => {
            content.style.visibility = 'hidden'
        });
        const lastporint = trcks.slice(-1)[0];
        const LngLat = lastporint.slice(0, 2);
        if (AMap && amap) {
            const marker = new AMap.Marker({
                position: new AMap.LngLat(LngLat[0], LngLat[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                // title: container,
                content: content, // 自定义点标记覆盖物内容
                offset: new AMap.Pixel(-20, -25), // 相对于基点的偏移位置
                anchor: 'top-right', // 设置锚点方位
            });
            amap?.add(marker);
        }
        if (mapbox) {
            new MapBoxGL.Marker(content).setLngLat(LngLat).addTo(mapbox);
        }
        // return content;
    };
    //添加标记点 
    const addMarker = async ({ map, AMap, type, className, coordinate, portCode, index }: any) => {
        if (type === 'amap') {
            const marker = new AMap.Marker({
                position: new AMap.LngLat(coordinate[0], coordinate[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: portCode,
                content: getMaker({ className, portCode }), // 自定义点标记覆盖物内容
                offset: new AMap.Pixel(-20, -25), // 相对于基点的偏移位置
                anchor: 'top-right', // 设置锚点方位
            });
            map?.add(marker);
        } else {
            await new MapBoxGL.Marker({ element: getMaker({ className, portCode, index }) }).setLngLat(coordinate).addTo(map);
        }
    };
    //生成标记实例
    const getMaker = ({ className, portCode, index }: any) => {
        const content = document.createElement('div');
        const inner = document.createElement('div');
        const port = document.createElement('div');
        content.className = className;
        inner.className = 'inner';
        port.className = portCode ? 'port' : 'serialNO';
        port.innerHTML = portCode || index || '';
        content.appendChild(inner);
        content.appendChild(port);
        // // 点击车辆图标 显示剩余里程
        if (className === 'nowmarke') {
            content.addEventListener("click", () => {
                const timeLeft = document.querySelector('.timeLeft') || {} as any
                timeLeft.style.visibility = 'visible'
            });
        }
        return content;
    };
    //切换地图
    const handleChangeMap = () => {
        setcurMap(!curMap);
    };
    //  轨迹回放按钮
    const rePlayFn = (isShow: boolean, route: any) => {
        if (!mapboxDom || !mapboxDom.getSource("replay")) return;
        const linesData = turf.featureCollection([]);
        // 如果是关闭弹框，则关闭回放的线条
        if (!isShow) {
            mapboxDom.getSource("replay").setData(linesData);
            return;
        }
        const coordinates = route.PlayLines;
        if (coordinates && coordinates.length) {
            const features = turf.lineString(coordinates);
            linesData.features = [features];
            mapboxDom.getSource("replay").setData(linesData);
            fitbounds(mapboxDom, coordinates, { bottom: 180 });
        }
    };
    return (
        <div className={'waybillMapBox'}>
            <div className={'waybillMap'} style={{ zIndex: curMap ? 1 : 0 }} id="DialogMapBox" />
            <div className={'waybillMap'} style={{ zIndex: curMap ? 0 : 1 }} id="DialogAMap" />
            {
                changeMap && (
                    <div className={'changemap'} onClick={handleChangeMap}>
                        <img className={'icon'} src={change} alt="" />
                        {language['changemap']}
                    </div>
                )
            }
            {/*轨迹回放 */}
            {/* <div className={"replayBox"}>
                <RePlay
                    onChange={rePlayFn}
                    download={downloadRoute}
                    DownLoading={DownLoading}
                    ReplayRoutes={ReplayRoutes}
                    SelRoute={SelRoute}
                    BtndDisabled={BtndDisabled}
                />
            </div> */}
            <div className={'waybillMapComps'}>
                <div className={'routesComp'}>
                    <RouteComp routings={routings} modeCode={modeCode} isWaybill={isWaybill}  scrollHight={scrollHight}
                    metaDataPropertyList={metaDataPropertyList}/>
                </div>
            </div>
        </div>
    );
};
