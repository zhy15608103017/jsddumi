import React from 'react';
import Step from './mainInterface';

export default () => {
  const seveNewMilestones = (v: any, callback: Function) => {
    new Promise((resolve, rejects) => {
      let res: any = [{ test: 'test' }];
      resolve(res);
    }).then((res) => {
      let obi = {
        status: 'success',
        data: res,
      };
      callback(obi);
    });
  };
  // const milestones = [
  //   {
  //     id: '4905558907884224512',
  //     code: 'SST_BIN',
  //     milestoneType: 'TRANSPORT_MILESTONE',
  //     est: null,
  //     act: 1646106171000,
  //     cutoff: null,
  //     riskLevel:"WARNING" // 异常节点
  //   },
  //   // {
  //   //   id: '4905558907884224512',
  //   //   code: 'SST_POL',
  //   //   milestoneType: 'TRANSPORT_MILESTONE',
  //   //   est: 1646106171000,
  //   //   act: null,
  //   //   cutoff: null,
  //   // },
  // ];
  const milestones = [
    {
      id: '4905558907884224512',
      code: 'SST_BIN',
      milestoneType: 'TRANSPORT_MILESTONE',
      est: null,
      act: 1646106171000,
      cutoff: null,
      riskLevel:"WARNING" // 异常节点
    },
    {
      id: '4906164738791129088',
      code: 'SST_LPP',
      milestoneType: 'TRANSPORT_MILESTONE',
      est: 1646106171000,
      act: 1646106172000,
      cutoff: null,
    },
    {
      id: '4906170468277501952',
      code: 'SST_POL',
      milestoneType: 'TRANSPORT_MILESTONE',
      est: 1646106171000,
      act: 1646106171000,
      cutoff: null,
    },
    {
      id: '4906171430350176256',
      code: 'SST_TDE',
      milestoneType: 'TRANSPORT_MILESTONE',
      est: 1646106171000,
      act: 1646106171000,
      cutoff: null,
    },
    {
      id: '4906171576379064320',
      code: 'SST_TAR',
      milestoneType: 'TRANSPORT_MILESTONE',
      est: 1646106171000,
      act: 1646106171000,
      cutoff: null,
    },
    {
      id: '4906174539906498560',
      code: 'SST_TUL',
      milestoneType: 'TRANSPORT_MILESTONE',
      est: 1646106171000,
      act: 1646106171000,
      cutoff: null,
    },
    {
      id: '4906175098252247040',
      code: 'SST_BCL',
      milestoneType: 'TRANSPORT_MILESTONE',
      est: null,
      act: null,
      cutoff: null,
    },
        {
        id: 4923395563473568000,
        code: 'SST_LPP',
        milestoneType: 'TRANSPORT_MILESTONE',
        est: null,
        act: null,
        cutoff: null,
        riskLevel:"WARNING" // 异常节点
      },
    {
      id: '4906905320002002944',
      code: 'SST_CUS_END',
      milestoneType: 'CUSTOMS_MILESTONE',
      est: null,
      act: 1644915600879,
      cutoff: null,
    },
  ];
  return (
    <div>
      <Step
        seveNewMilestones={seveNewMilestones} //编辑传出数据并接受业务方回调
        milestones={milestones} //日期数据
        route="DOMESTIC" // 运输路线
        transportMode="TPM_ROAD" //  运输方式
        status={true} //针对货主隐藏更新节点按钮字段 ||只允许承运商操作里程碑
        logisticsOrderId={'11111111'} //根据id设置最后高亮节点
        // updatedBtn="按钮" //自定义弹窗按钮文字（非必传）
        // iconColor='yellow' //自定义异常节点颜色 （非必传）
        // headerText="弹框" // 自定义弹框title文本（非必传）
      />
    </div>
  );
};
export { Step };

