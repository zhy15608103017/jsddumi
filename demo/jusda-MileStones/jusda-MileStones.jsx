// import Demo from '@jusda-tools/jusda-MileStones';

// const AppLayout = () => {
//   const seveNewMilestones = (v, callback) => {
//     new Promise((resolve, rejects) => {
//       let res = [{ test: 'test' }];
//       resolve(res);
//     }).then((res) => {
//       let obi = {
//         status: 'success',
//         data: res,
//       };
//       callback(obi);
//     });
//   };
//   const milestones =[
//     {
//         "id": 4999867722475266000,
//         "code": "SST_BIN",
//         "milestoneType": "TRANSPORT_MILESTONE",
//         "est": null,
//         "act": {
//             "time": 1527980400000,
//             "zone": "-07:00"
//         },
//         "cutoff": null,
//         "riskLevel": null
//     },
//     {
//         "id": 5022029899749618000,
//         "code": "SST_LPP",
//         "milestoneType": "TRANSPORT_MILESTONE",
//         "est": null,
//         "act": {
//             "time": 1658433420000,
//             "zone": "-07:00"
//         },
//         "cutoff": null,
//         "riskLevel": null
//     },
//     {
//         "id": 5022029899749618000,
//         "code": "SST_POL",
//         "milestoneType": "TRANSPORT_MILESTONE",
//         "est": null,
//         "act": {
//             "time": 1658519820000,
//             "zone": "-07:00"
//         },
//         "cutoff": null,
//         "riskLevel": null
//     },
//     {
//         "id": 5022029899749618000,
//         "code": "SST_VDP",
//         "milestoneType": "TRANSPORT_MILESTONE",
//         "est": null,
//         "act": {
//             "time": 1659149820000,
//             "zone": "-07:00"
//         },
//         "cutoff": null,
//         "riskLevel": null
//     }
// ]
//   return (
//     <Demo
//       seveNewMilestones={seveNewMilestones} //编辑传出数据并接受业务方回调
//       milestones={milestones} //日期数据
//       route={"DOMESTIC"} // 运输路线
//       transportMode={'TPM_AIR'} //  运输方式
//       status={true} //针对货主隐藏更新节点按钮字段 ||只允许承运商操作里程碑
//       logisticsOrderId={'4999033742894342223'} //不确定，可能根据id设置最后高亮节点
//     />
//   );
// };

// export default AppLayout;