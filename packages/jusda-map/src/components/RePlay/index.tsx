// import React, { useEffect, useState } from "react";
// import styles from "./style.less";
// import moment from "moment";
// import {
//   CloseOutlined,
//   PlayCircleOutlined,
//   DownloadOutlined
// } from "@ant-design/icons";
// import { Button, Select, DatePicker, message } from "antd";
// import language from '../../locales/index';
// import Routesimg from '../../assets/img/routes.png';
// // import { isLngLat } from "../../utils/mapFn";
// // import { ExportFn } from "../../utils/fn";
// const { RangePicker } = DatePicker;
// interface RePlayState {
//   onChange?: (val1: boolean, value?: any) => void;
//   download?: () => void;
//   DownLoading: Boolean;//下载按钮loading状态
//   ReplayRoutes: any;//筛选后符合要求的运段
//   BtndDisabled: Boolean;//下载按钮是否禁用
//   SelRoute: any, // 选中的运段
// }
// export default ({
//   onChange = () => { },
//   download = () => { },
//   DownLoading,
//   ReplayRoutes,
//   SelRoute,
//   BtndDisabled }: RePlayState) => {
//   const [ShowReplay, setShowReplay] = useState(false); // 显示回放弹框
//   const [SelRouteIndex, setSelRouteIndex] = useState(0); // 选中的运段索引
//   // const [SelRoute, setSelRoute] = useState({}); // 选中的运段
//   // const [DownLoading, setDownLoading] = useState(false); // 下载按钮loading
//   // const [BtndDisabled, setBtndDisabled] = useState(true); // 下载按钮loading
//   const [SelReplayTimes, setSelReplayTimes]: any = useState({ start: "", end: "" }); // 选中的时间段
//   // const [ReplayRoutes, setReplayRoutes] = useState([]); // 筛选后符合要求的运段
//   // 当运段选择发生改变的时候
//   const handleChange = (value: any) => {
//     setSelRouteIndex(value);
//     // setSelRoute(ReplayRoutes[value] || ReplayRoutes[0]);
//   };
//   //当时间发生改变的时候
//   const onChangeTime = (value: any) => {
//     const times = {
//       start: value[0],
//       end: value[1]
//     };
//     //设置回放的时间
//     setSelReplayTimes(times);
//   };
//   // 关闭弹框
//   const closeDialog = () => {
//     setShowReplay(false);
//     onChange(false);
//   };

//   // 轨迹回放
//   const handleReplay = () => {
//     const line = SelRoute && SelRoute.line ? SelRoute.line : [];
//     if (line && line.length) {
//       const startTime = moment(SelReplayTimes.start).valueOf() || "";
//       const endTime = moment(SelReplayTimes.end).valueOf() || "";
//       const lines = line
//         ? line.filter((item: any) => {
//           return item[2] && item[2] >= startTime && item[2] <= endTime;
//         })
//         : [];
//       if (!lines || lines.length < 2) {
//         message.warning(language["trans.map.message"]);
//         onChange(false);
//         return;
//       }
//       onChange(true, {
//         ...SelRoute,
//         PlayLines: lines
//       });
//     } else {
//       message.warning(language["trans.map.NoRoute"]);
//     }
//   };


//   //下载轨迹信息
//   // const downloadRoute = () => {
//   //   // const line = SelRoute && SelRoute.line ? SelRoute.line : [];
//   //   if (routestracks && routestracks.length) {
//   //     setDownLoading(true);
//   //     // if (getRouteFilesResultion && getRouteFilesResultion.data) {
//   //     if ("5055457131975319552") {
//   //       // ExportFn(getRouteFilesResultion.data, Downloadrequesturl).then(() => {
//   //       ExportFn("5055457131975319552", "https://mpuat.jus-link.com/api/juslink-data-export-service/exportTask/5055457131975319552/downloadDetail").then(() => {
//   //         setDownLoading(false);
//   //       });
//   //     } else {
//   //       setDownLoading(false);
//   //     }
//   //   }
//   // };

//   useEffect(() => {
//     // 选择某一个运段后，从中找出最初坐标的时间和最后一个坐标的时间，作为时间范围的初始值
//     const line = SelRoute && SelRoute.line ? SelRoute.line : [];
//     if (line && line.length) {
//       const startLine = line[0];
//       const endLine = line[line.length - 1];
//       const times = {
//         start: startLine[2] ? moment(startLine[2]) : "",
//         end: endLine[2] ? moment(endLine[2]) : ""
//       };
//       setSelReplayTimes(times);
//     }
//   }, [SelRoute]);

//   // 从运输段中筛选出符合要求的运段
//   // useEffect(() => {
//   //   // 从运输段中筛选出符合要求的运段
//   //   if (route && route.length) {
//   //     const rouN = route.filter((item: any) => {
//   //       return item && item.transportModeCode === "TPM_ROAD" && isLngLat(routestracks);
//   //       // return item && isLngLat(item.line);
//   //     });
//   //     console.log("route", route)
//   //     console.log("rouN", rouN)
//   //     if (rouN && rouN.length) {
//   //       // setReplayRoutes(rouN);
//   //       // 默认选中第一段为初始段
//   //       // setSelRoute(rouN[SelRouteIndex] || rouN[0]);
//   //       // setBtndDisabled(false);
//   //     }
//   //   } else {
//   //     // setReplayRoutes([]);
//   //   }
//   // }, [route]);




//   return (
//     <div className={styles.startBtnBox}>
//       <Button
//         // disabled={BtndDisabled}
//         disabled={false}
//         className={`${styles.startBtn} map-replay btnprimary`}
//         onClick={() => setShowReplay(true)}
//       >
//         <img src={Routesimg} style={{ width: "20px", height: "20px", position: "relative", top: "-3px" }} />
//         <span>{language["replay.Btn"]}</span>
//       </Button>
//       <div>
//         <div
//           className={`${styles.replayPanel} ${ShowReplay ? styles.show : ""}`}
//         >
//           <div className={styles.replayClose} onClick={closeDialog}>
//             <CloseOutlined />
//           </div>
//           <div className={styles.replayItem}>
//             <div className={styles.replayTit}>
//               {language["replay.Route"]}
//             </div>
//             <Select
//               className={"replaySelect"}
//               value={SelRouteIndex}
//               placeholder={language["replay.selectRoute"]}
//               style={{ width: "100%" }}
//               onChange={handleChange}
//             >
//               {ReplayRoutes &&
//                 ReplayRoutes.map((item: any, index) => {
//                   return (
//                     <Select.Option
//                       key={index}
//                       value={index}
//                     >{`${item.originCityName} - ${item.destinationCityName}`}</Select.Option>
//                   );
//                 })}
//             </Select>
//           </div>
//           <div className={styles.replayItem}>
//             <div className={styles.replayTit}>
//               {language["replay.Time"]}
//             </div>
//             <RangePicker
//               className={"replayTime"}
//               dropdownClassName="replayDialog"
//               showTime={{ format: "HH:mm:ss" }}
//               format={"YYYY-MM-DD HH:mm:ss"}
//               value={[SelReplayTimes.start, SelReplayTimes.end]}
//               placeholder={[
//                 language["replay.startTime"],
//                 language["replay.endTime"]

//               ]}
//               onChange={onChangeTime}
//               allowClear={false}
//             />
//           </div>-
//           <div className={styles.replayBtn}>
//             <Button
//               className={styles.btnprimary}
//               icon={<PlayCircleOutlined />}
//               onClick={handleReplay}
//             >
//               {language["replay.replay"]}
//             </Button>
//             <Button
//               className={styles.replayDown}
//               ghost
//               icon={<DownloadOutlined />}
//               loading={DownLoading}
//               onClick={download}
//             >
//               {language["replay.down"]}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
