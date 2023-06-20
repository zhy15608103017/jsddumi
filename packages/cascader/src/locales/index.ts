
const EN = {
    'pleaseSelectCountry': 'Please select country',
    firstLevelArea: 'First-level dist',
    firstLevelAreaTips:
        'Province,Autonomous region,Municipality,Special administrative region',
    secondaryLevelArea: 'Secondary-level dist',
    secondaryLevelAreaTips: 'Prefecture,city,Autonomous prefecture,League',
    tertiaryLevelArea: 'Tertiary-level dist',
    tertiaryLevelAreaTips: 'County,District,County-level city,Banner',
};

const ZH = {
    pleaseSelectCountry: '请选择国家',
    firstLevelArea: '一级行政区域',
    firstLevelAreaTips: '省,自治区,直辖市,特别行政区',
    secondaryLevelArea: '二级行政区域',
    secondaryLevelAreaTips: '地区,市,自治州,盟',
    tertiaryLevelArea: '三级行政区域',
    tertiaryLevelAreaTips: '县,市辖区,县级市,旗',
};

const localesConfig = new Map()
    .set('en-US', EN)
    .set('zh-CN', ZH);


export default localesConfig
