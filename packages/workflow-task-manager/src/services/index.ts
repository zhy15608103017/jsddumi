/* eslint-disable @typescript-eslint/explicit-function-return-type */
import request from '../../utils/request';

const prefix = '/juslink-common-workflow-center/workflow-center';
export async function fetchTodo() {
    return request(`${prefix}/task/pends`, {
        method: 'get',
    });
}

export async function fetchDetail(data: {processInstanceId: string; taskId: string }){
    return request(`${prefix}/task/detail`, {
        method: 'post',
        data,
    });
}

