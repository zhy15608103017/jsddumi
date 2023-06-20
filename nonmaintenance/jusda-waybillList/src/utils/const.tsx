import language from '../locales/index'

export const ICON_CODE = {
    SST_BIN: 'icon-B_jiedan-01',
    SST_ETA: 'icon-B_kongche-01',
    SST_TLO: 'icon-B_zhuangche-01',
    SST_LPP: 'icon-B_likaitihuodi-011',
    SST_POL: 'icon-B_didashifagang-01',
    SST_VDP: 'icon-B_yifayun-01',
    SST_TDE: 'icon-B_luyuncemian-',
    SST_TAR: 'icon-B_dida-01',
    SST_VAR: 'icon-B_dida-01',
    SST_LPD: 'icon-B_likaimudegang-01',
    SST_CDL: 'icon-B_yisongda-01',
    SST_TUL: 'icon-B_yisongda-01',
    SST_BCL: 'icon-B_yiwancheng-01',
    SST_CUS_START: 'icon-B_yiwancheng-01',
    SST_CUS_END: 'icon-B_yiwancheng-01',
  };

export const ICON_TIMESTR = {
  SST_BIN: [language["JusdaWaybillList.实际接单时间"]],
  SST_ETA: [language["JusdaWaybillList.预计到达提货点时间"], language["JusdaWaybillList.实际到达提货点时间"]],
  SST_LPP: [language["JusdaWaybillList.预计离开提货点时间"],language["JusdaWaybillList.实际离开提货点时间"]],
  SST_POL: [language["JusdaWaybillList.预计抵达始发港时间"], language["JusdaWaybillList.实际抵始发港时间"], language["JusdaWaybillList.截港时间"]],
  SST_VDP: [language["JusdaWaybillList.预计发运时间"],language["JusdaWaybillList.实际发运时间"]],
  SST_TDE: [language["JusdaWaybillList.预计发运时间"],language["JusdaWaybillList.实际发运时间"]],
  SST_TAR: [language["JusdaWaybillList.预计到达时间"],language["JusdaWaybillList.实际到达时间"]],
  SST_VAR: [language["JusdaWaybillList.预计抵达时间"],language["JusdaWaybillList.实际抵达时间"]],
  SST_LPD: [language["JusdaWaybillList.预计离开目的港时间"],language["JusdaWaybillList.实际离开目的港时间"]],
  SST_CDL: [language["JusdaWaybillList.预计送达时间"],language["JusdaWaybillList.实际送达时间"]],
  SST_TUL: [language["JusdaWaybillList.预计卸货时间"],language["JusdaWaybillList.实际卸货时间"]],
  SST_BCL: [language["JusdaWaybillList.预计运输完成时间"],language["JusdaWaybillList.实际运输完成时间"]],
  SST_TLO: [language["JusdaWaybillList.预计装车时间"],language["JusdaWaybillList.实际装车时间"]],
};
  