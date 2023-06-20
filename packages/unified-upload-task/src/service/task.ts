import request  from "../utils/request";

// 获取任务列表
export async function getTaskHistoriesPage(data: any) {
    const { page, size, sorts } = data;

    return request(
        `/juslink-tenant-management/tasks/me/page?page=${page}&size=${size}&sort=${sorts?.toString() ||
            'audit.createdTime,desc'}`,
        {
            method: 'POST',
            data,
        },
    );
}
export async function getTask(id: any) {
    return request(`/juslink-tenant-management/tasks/${id}`, {
        method: 'GET',
    });
}
export async function getTaskStatus(id: any) {
    return request(`/usercenter-service/tasks/${id}`, {
        method: 'GET',
    });
}