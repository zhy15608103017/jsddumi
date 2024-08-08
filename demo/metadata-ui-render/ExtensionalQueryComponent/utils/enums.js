export const OperatorType = {
    BETWEEN: 'BETWEEN',
    CONTAINS: 'CONTAINS',
    EQUAL: 'EQUAL',
    GREATER: 'GREATER',
    GREATER_OR_EQUAL: 'GREATER_OR_EQUAL',
    LESS: 'LESS',
    LESS_OR_EQUAL: 'LESS_OR_EQUAL',
};

export const OperatorTypeLabelMap = {
    [OperatorType.BETWEEN]: '范围',
    [OperatorType.CONTAINS]: '包含',
    [OperatorType.EQUAL]: '等于',
    [OperatorType.GREATER]: '大于',
    [OperatorType.GREATER_OR_EQUAL]: '大于等于',
    [OperatorType.LESS]: '小于',
    [OperatorType.LESS_OR_EQUAL]: '小于等于',
};
