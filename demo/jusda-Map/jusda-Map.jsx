import Map from '@jusda-tools/jusda-map';
let token ="Bearer eyJraWQiOiJqd3QiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJBdXRoZW50aWNhdGlvbiIsInVzZXJfbmFtZSI6Ind1bGlhb196aG9uZ2hhaXlhbiIsImV4cCI6MTY2NDQ3NjI1MywidXNlcmFjY291bnRfaWQiOiI1MDI1NjI4MjE0NzUzOTkyNzA0IiwiaWF0IjoxNjY0NDQwMjUzLCJjbGllbnRfaWQiOiI0cGxfbWF0ZXJpYWxfdmlzdWFsIiwianRpIjoiNzY0NWZiYjZjNmQ1NGNkNmFhMzVjNjdjMTYxOGVhOTcifQ.l_EqSpEqzeqIHHXRGfyCJY3EgL_UsEQc8ggYkt2as97iO6L-l-GZPUX3mAKqoYjP-P4177VkdnvNknd8Ja4m-s8OYz8XcDzVFCfRRCLl5438BHdmt5njqPVheuRoJ7qvlLW3bxYxn3xHrovkJDHLzEU2aYLEpNTyo9TLMjN_K2CLNE3snTV5PoL2_91S5GJ-o-kiZIWc6FK4znOsSTWPT1VCgCMbfYF9xF_28J-AJ3pv7oF1FY2J1ALvdIV225Tw8rR7mcet3NgI6qL7ZTww1v02fLXKOe9tcCAVJaW1bmI1LIPcdegwVs3ZG_Y1OrgJXMh1Zoigc1dMWZRnXbQmLw"
import React, { useState,} from 'react';
const AppLayout = () => {
const [routingsCoordinates,setroutingsCoordinates]=useState([])
   fetch("https://mpdev.jus-link.com/api/juslink-4pl-spm-app/shipment-orders/list/Jzxh123456/Fxh123458",{
    method:"GET",
    headers: {
        clientId:'juslink_4pl_spm_app',
        'Content-Type': 'application/json',
        authorization:"Bearer eyJraWQiOiJqd3QiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJBdXRoZW50aWNhdGlvbiIsInVzZXJfbmFtZSI6Ind1bGlhb196aG9uZ2hhaXlhbiIsImV4cCI6MTY2NDUzODMzMiwidXNlcmFjY291bnRfaWQiOiI1MDI1NjI4MjE0NzUzOTkyNzA0IiwiaWF0IjoxNjY0NTAyMzMyLCJjbGllbnRfaWQiOiJqdXNsaW5rXzRwbF9zcG1fYXBwIiwianRpIjoiZTFjNTgyZGU1MDNjNDZiY2IzMGE2ODVlMzViNWU3YTMifQ.YqKE97gXZK98Cx-SwGGNhJqUPO04jUp6m1fQfAgtSLHBQn5fNIGwqwqSkkQXZ0EOrDvI4fURXr5SMSCt7s6UDTGkQXos4DgzJ7-G9imRt0e5SJziCl7cq46aw_uKACbwEPbxlffvaCL8gnZ3YwgTz2x154mCGyuPKAapZn0ZQhD4o-2pM-wla-M2kx0NieFeF982d1kZew5nfhwMRvnHwgIJPhFrQts01a9IPxKpr9R2hQJXOTwuemAXIseQFyHBuau3S3oJWHry2kfHdX7Kq7T1Ce1uUIcdbmO6SXDmRJOdI1i3E8wRovwarXCZhqoaQgWSIOt9sLU0rsJIIK3ayA"
    },
   }).then((response) => response.json()).then((res)=>{
    setroutingsCoordinates(res.data)
   })
    const trcks = [[
        [116.41667,39.91667],
        [117.20000,39.13333],
        [114.10000,22.20000],
        [113.23333,23.16667],
        [113.51667,22.30000],
        [114.06667,22.61667],
        [120.20000,30.26667],
        [106.45000, 29.56667],
        [120.33333,36.06667],
    ],[
    [243.61, 39.9],
    [116.408383, 39.739973],
    [116.698141, 39.562196],
    [116.808525, 39.49452],
    [117.04769, 39.391098],
    [117.04769, 39.391098],
    [117.213265, 39.094239],
    [117.210391, 39.093791]
  ]]

    const routingsCoordinate = [
        {
            "originCoordinate": [
                106.54724,
                29.564869
            ],
            "destinationCoordinate": [
                113.93273450000001,
                22.537462
            ]
        },
        {
            "originCoordinate": [
                113.93273450000001,
                22.537462
            ],
            "destinationCoordinate": [
                null,
                null
            ]
        },
        {
            "originCoordinate": [
                116.410748,
                39.5113035
            ],
            "destinationCoordinate": [
                101.812565,
                36.619895
            ]
        }
    ]
    return (
        <Map
        originToDestination={{ origin: [104.07, 30.56], originName: '成都', destination: [120.637, 27.944], destinationName: '温州' }}//起始地-目的地
        routings={[{ originCityName: '重庆', destinationCityName: '深圳', transportModeCode: 'TPM_ROAD' }, { originCityName: '深圳', destinationCityName: '北京' }, { originCityName: '北京', destinationCityName: '西宁' }]}//运段列表
        mainMapLine={true}//运单状态
        routingsCoordinate={routingsCoordinate}//运段或者運單坐标列表
        trcks={trcks}//轨迹坐标列表
        AMapSecurityJsCode={'b0f7c23b614a8aa769c79f35e78e457d'}//密钥-高德
        AMapKey={'eb7042b051bd3269b8641199286a8229'}//key-高德
        // defaultMap={'mapbox'}//首选地图 amap/mapbox
        modeCode={'TPM_ROAD'}//运输模式
        statusCode={'SST_BC'}//运输节点
        // styles={{ height: '300px', width: '500px' }}
        changeMap={true}
        // isWaybill={true}
    />
    );
};

export default AppLayout;