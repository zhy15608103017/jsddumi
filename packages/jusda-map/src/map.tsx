/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable spaced-comment */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent, useEffect, useState, } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import { toHourMinute } from './utils/fn';
import { Modal, Spin } from 'antd';
import MapBoxGL, { CreateMap, fitbounds, getLnglat, isLngLat, greatCircle,getLnglatList } from './utils/mapFn';
import MapDialog from './components/MapDialog';
import language from './locales/index';
import change from './assets/img/change.png';
import zoom from './assets/img/zoom.png';
import { localPermissionFn } from '@jusda-tools/local-permission';
import './index.less';
interface MapProps {
  originToDestination: any;//起始地-目的地 {origin:[104,89],originName:'成都',destination:[104,89],destinationName:'成都'}
  routings: any[];// 运段列表 [{ originCityName: '成都', destinationCityName: '重庆', transportModeCode: 'TPM_ROAD' }]
  routingsCoordinate: Array<number>;// 运段坐标列表 [{originCoordinate:[132,88],destinationCoordinate:[132,88]}]
  trcks: Array<number>;//轨迹坐标列表 [[55,44]]
  lineColor: string;//连线颜色
  mainMapLine: boolean;//小地图是否连线
  AMapSecurityJsCode: string;//密钥-高德
  AMapKey: string;//key-高德
  defaultMap?: string;//首选地图 'amap'/'mapbox',可填可不填，不填會以用戶所在地區在展示對應地圖
  styles?: any;//样式 {height:'200px'}
  changeMap?: boolean;//是否开启切换地图功能
  hideViewFull?:boolean;//是否开始查看大图功能
  modeCode?: string,//运输模式
  statusCode?: string,//运输节点
  isWaybill?: boolean,//判斷是否是運單
  scrollHight?:string,//出现滚动条高度
  id?:string
  metaDataPropertyList?:string
}

const MapComp: FunctionComponent<MapProps> = (props) => {
  const {
    originToDestination,
    routings = [],
    routingsCoordinate,
    AMapSecurityJsCode,
    AMapKey,
    defaultMap,
    styles,
    lineColor,
    mainMapLine,
    trcks,
    changeMap,
    hideViewFull,
    modeCode,
    statusCode,
    isWaybill = false,
    scrollHight="170px",
    id=window.location.hash,
    metaDataPropertyList=[]
  } = props;
  const { originName, destinationName } = originToDestination || {}
  const origin = [...getLnglat(originToDestination?.origin)]
  const destination = [...getLnglat(originToDestination?.destination)]
  const [curMap, setcurMap] = useState(false);//当前地图
  const [visible, setVisible] = useState(false);//地图大图显隐
  const [amapDom, setAmapDom] = useState();//高德实例
  const [AMap, setAMap] = useState();//高德类
  const [mapboxDom, setMapboxDom] = useState();//mapbox实例
  const [distance, setDistance] = useState('');//剩余公里数
  const [loading, setLoading] = useState(true);//剩余公里数
  const [userRegion, setUserRegion] = useState()
  // 连接起点终点的线
  const FormToDashRote = {
    id: 'FormToDash',
    type: 'line',
    source: 'FormTo',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': lineColor || '#ffc500',//线条颜色
      'line-width': 2,//线条宽度
      'line-opacity': 0.8,//线条透明度
    },
  };

  //加载高德地图类
  useEffect(() => {
    LoadAmap()
    
  //  return ()=>{
  //   mapboxDom?.remove()
  //  }
  }, []);

  // 调用高德计算剩余公里数
  useEffect(() => {
    if (AMap && trcks && modeCode === "TPM_ROAD" && statusCode !== "SST_BCL") {
      // realTimeDistance(AMap)
    }
  }, [AMap]);
  // 獲取用戶地區
  const getRegion = async () => {
    const res = await localPermissionFn()
    setUserRegion(res)
  }
  useEffect(() => {
    getRegion()
  }, [])
  // 判斷用戶是否有首選地圖，沒有則按照用戶地區展示
  useEffect(()=>{
       if(defaultMap){
        setcurMap(!Boolean(defaultMap === 'amap'))
       }else{
        setcurMap(!userRegion)
       }
  },[defaultMap,userRegion])
  // 高德地图绘制 起始地-目的地
  useEffect(() => {
    if (originToDestination && amapDom) {
      drawAmap(amapDom, AMap)
    }
  }, [originToDestination, amapDom]);

  // mapbox地图绘制 起始地-目的地
  useEffect(() => {
    if (originToDestination && mapboxDom) {
      drawMapBox(mapboxDom)
    }
  }, [mapboxDom,originToDestination]);
 useEffect(()=>{

 
 },[originToDestination])
  // 根据配置渲染对应地图
  useEffect(() => {
    if (!curMap && !amapDom && AMap) {
      setLoading(true)
      InitAMap(AMap)//初始化地图 高德
    }
    if (curMap && !mapboxDom) {
      setLoading(true)
      InitMapBox()//初始化地图 mapbox
    }
  }, [curMap, AMap]);

  const LoadAmap = () => {
    window._AMapSecurityConfig = {
      securityJsCode: AMapSecurityJsCode,
    };
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
  // 高德地图绘制 起始地-目的地
  const drawAmap = (amap: any, AMap: any) => {

    amap.clearMap()
    if (origin && isLngLat(origin)) {
      //添加起点坐标
    addMarker({ map: amap, AMap, type: 'amap', className: 'startMarker', coordinate: origin, portCode: originName });
    }
    if (destination && isLngLat(destination)) {
      //添加终点坐标
  addMarker({ map: amap, AMap, type: 'amap', className: 'endMarker', coordinate: destination, portCode: destinationName });
    }
    //设置地图展示范围
    if (origin && isLngLat(origin) && destination && isLngLat(destination)) {
      const mybounds = new AMap.Bounds(
        origin[0],
        origin[1],
        destination[0],
        destination[1]
      );

      amap.setBounds(mybounds, false, [50, 50, 50, 50]); //设置地图展示范围

      if (mainMapLine) {
        let path = [
          new AMap.LngLat(origin[0], origin[1]),
          new AMap.LngLat(destination[0], destination[1])]
        // 创建折线实例

        let polyline = new AMap.Polyline({
          path: path,
          borderWeight: 5, // 线条宽度，默认为 1
          strokeColor: '#ffc500', // 线条颜色
          lineJoin: 'round', // 折线拐点连接处样式
        });


        // 将折线添加至地图实例
        amap.add(polyline);
      }
    }
  }
  //初始化地图 高德
  const InitAMap = async (AMap: any) => {
    const amap = new AMap.Map('amap', {
      mapStyle: 'amap://styles/whitesmoke', //设置地图的显示样式
    })
    setAmapDom(amap)
    setLoading(false)
  };
  //mapbox地图绘制 起始地-目的地
  const drawMapBox = async (mapbox: any) => {
// if(mapbox?.getLayer(`FormTo${id}`)){
//   mapbox?.moveLayer(`FormTo${id}`)
// }
    if (origin && isLngLat(origin)) {
    
      //添加起点坐标
   addMarker({ map: mapbox, type: 'mapbox', className: 'startMarker', coordinate: origin, portCode: originName });
    }
    if (destination && isLngLat(destination)) {
      //添加终点坐标
   addMarker({ map: mapbox, type: 'mapbox', className: 'endMarker', coordinate: destination, portCode: destinationName });
      if (origin && isLngLat(origin)) {
        // 使用起点和终点坐标来圈定展示范围
        const r = [origin, destination].filter(
          (p) => p?.length > 1,
        );
        if (r?.length > 1) {
          fitbounds(mapbox, r, { left: 50, right: 50 });
        }
        // 连接起点和终点划线

        if (mainMapLine&&r?.length > 1) {
     
          // if(!mapbox?.getLayer(`FormTo${id}`)){
          //   // InitMapBox()
          //             mapbox?.addLayer({
          //     id:`FormTo${id}`,
          //     'type': 'line',
          //     'source': {
          //         'type': 'geojson',
          //         'lineMetrics': true,
          //         'data': {
          //             'type': 'FeatureCollection',
          //             'features': [{
          //                 'type': 'Feature',
          //                 'geometry': {
          //                     'type': 'LineString',
          //                     'coordinates': getLnglatList(r)
          //                 }
          //             }]
          //         }
          //     },
     
          //     layout: {
          //       'line-cap': 'round',
          //       'line-join': 'round',
          //     },
          //     paint: {
          //       'line-color': lineColor || '#ffc500',//线条颜色
          //       'line-width': 2,//线条宽度
          //       'line-opacity': 0.8,//线条透明度
          //     },
          // });
          // }
          mapbox.on('load', () => {
            const FormToLine = {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'LineString',
                    coordinates: greatCircle({ line: r }),
                    // oordinates: getLnglatList(r),
                  },
                },
              ],
            };
          //   if( mapbox?.getSource('FormTo')){
          //     if(mapbox?.getLayer('FormToDash')){
          //      mapbox?.removeLayer('FormToDash')
          //     }
          //     mapbox?.removeSource('FormTo')
          //  }

          //  mapbox?.addSource('FormTo', {
          //    type: 'geojson',
          //    data: FormToLine,
          //  });
          //  mapbox?.addLayer(FormToDashRote);
          // console.log(mapbox?.getLayer('FormTo1'));


          if(!mapbox?.getLayer(`FormTo${id}`)){

            mapbox?.addLayer({
              id:`FormTo${id}`,
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
                              'coordinates': getLnglatList(r)
                          }
                      }]
                  }
              },
     
              layout: {
                'line-cap': 'round',
                'line-join': 'round',
              },
              paint: {
                'line-color': lineColor || '#ffc500',//线条颜色
                'line-width': 2,//线条宽度
                'line-opacity': 0.8,//线条透明度
              },
          });
          }
               
         
       
          })
        }
      }
    }
  };
  //初始化地图 mapbox
  const InitMapBox = async () => {
    //获取dom对象，
    // const containers = document.getElementById('jusdamap');
    // const elemt =document.createElement('div')
    // elemt.classList.add("Mapcontainer")
    // elemt.style.zIndex=curMap ? "10" : '0'
    // containers?.appendChild(elemt)
    const container = document.getElementById('mapbox');
    const mapbox = await CreateMap({ container , 
      // interactive: false 
    });
    setMapboxDom(mapbox)
    setLoading(false)
  };
  // 计算剩余公里以及添加实时在途mark
  // const realTimeDistance = (AMap: any) => {
  //   // // 根据起终点经纬度规划驾车导航路线
  //   let lastporint = trcks.slice(-1)[0];
  //   let LngLat = lastporint.slice(0, 2);

  //   const driving = new AMap.Driving({
  //     policy: AMap.DrivingPolicy.LEAST_TIME
  //   })
  //   if (driving && LngLat) {
  //     // 获取终点坐标
  //     driving.search(
  //       getLnglat(LngLat),
  //       getLnglat(destination),
  //       function (status: string, result: any) {
  //         // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
  //         if (status === "complete") {
  //           let time = toHourMinute(Number(result.routes[0].time));
  //           let kilometer = (result.routes[0].distance / 1000).toFixed(1);
  //           const container = `${language[
  //             "ctDlg.map.nowTimeleft"
  //           ]}${kilometer} ${language[
  //           "ctDlg.map.kilometers"
  //           ]} | ${language["ctDlg.map.About"]}${time.hour
  //             }  ${language["ctDlg.map.hours"]}${time.minutes
  //             }  ${language["ctDlg.map.minutes"]}`
  //           setDistance(container)
  //         } else {
  //           console.log("获取驾车数据失败：", result);
  //         }
  //       }
  //     );
  //   }
  // };
  //坐标点实例
  const getMaker = ({ className, portCode }: any) => {
    const content = document.createElement('div');
    const port = document.createElement('div');
    content.className = className;
    port.className = 'port';
    port.innerHTML = portCode || '';

    content.appendChild(port);
    return content;
  };

  //添加标记点 
  const addMarker = async ({ map, AMap, type, className, coordinate, portCode }: any) => {
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
       await new MapBoxGL.Marker({ element: getMaker({ className, portCode }) }).setLngLat(coordinate).addTo(map);
    }
  };

  //切换地图
  const handleChangeMap = () => {
    // InitMapBox()
    setcurMap(!curMap);

  };

  //点击查看大图
  const handleViewFull = () => {
    setVisible(true);
  };
  return (
    <div style={{ width: '300px', height: '300px', ...styles }}>
      <Spin spinning={loading} delay={500}>
        <div className={'MapComp'} style={styles} id="jusdamap">
          <div className={'Mapcontainer'} style={{display:curMap?"block":"none"}} id="mapbox" />
          <div className={'Mapcontainer'} style={{display:!curMap?"block":"none"}} id="amap" />
          {
            changeMap && (
              <div className={'changemap'} onClick={handleChangeMap}>
                <img className={'icon'} src={change} alt="" />
                {language['changemap']}
              </div>
            )
          }
          {!hideViewFull && <div className={'viewFull'} onClick={handleViewFull}>
            <img className={'icon'} src={zoom} alt="" />
            {language['viewFull']}
          </div>}
          {distance && (
            <div className={'distance'}  >
              {distance}
            </div>
          )}
        </div>
      </Spin>
      <Modal
        style={{ top: 20 }}
        width={'95vw'}
        visible={visible}
        onCancel={() => setVisible(false)}
        destroyOnClose={true}
        footer={false}
      >
        <MapDialog
          originToDestination={originToDestination}
          metaDataPropertyList={metaDataPropertyList}
          routings={routings}
          trcks={trcks}
          curMap={curMap}
          AMapKey={AMapKey}
          changeMap={changeMap}
          distance={distance}
          modeCode={modeCode}
          statusCode={statusCode}
          routingsCoordinate={routingsCoordinate}
          isWaybill={isWaybill}
          scrollHight={scrollHight}
        />
      </Modal>
    </div>
  );
};
export default MapComp;
