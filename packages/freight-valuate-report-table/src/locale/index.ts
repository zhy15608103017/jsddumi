export enum Locale {
    'zh-CN' = 'zh-CN',
    'en-US' = 'en-US'
}

const locale = {
    [Locale['zh-CN']]: {
        total:'合计',
        quantity: '数量',
        minAmount: '最低收费',
        amount:'计入价',
        valuationUnitType:'计价单位',
        unitPrice:'单价/固定价格',
        currencyType: '币别',
        taxRate:'税率%',
        valuationItemName:'费用项名称',
        volume:'体积（/m³）',
        grossWeight:'毛重（/KG）',
        netWeight:'净重（/KG）',
        chargeableWeight:'计费重量（/KG）',
        previewValuate:'预估价格',
        noData: '暂无数据',
        error: '下载失败',
        success: '下载成功',
        wrongTaskId: '下载任务ID不正确',
        PRODUCT_NOT_FOUND: '费率产品未找到',
        SYSEM_ERROR: '系统异常',
    },
    [Locale['en-US']]: {
        total:'Total',
        quantity: 'Quantity',
        minAmount: 'Min Amount',
        amount:'Amount',
        valuationUnitType:'Valuation Unit Type',
        unitPrice:'Unit Price',
        currencyType: 'Currency',
        taxRate:'Tax Rate',
        valuationItemName:'Valuation Item Name',
        volume:'Volume（/m³）',
        grossWeight:'Gross Weight（/KG）',
        netWeight:'Net Weight（/KG）',
        chargeableWeight:'Chargeable Weight（/KG）',
        previewValuate:'Estimated Price',
        noData: 'No Data',
        error: 'download faild',
        success: 'download success',
        wrongTaskId: 'taskId is not valid',
        PRODUCT_NOT_FOUND: 'Tariff product cannot be found',
        SYSEM_ERROR: 'SYSEM ERROR',
    },
};

export default locale;


