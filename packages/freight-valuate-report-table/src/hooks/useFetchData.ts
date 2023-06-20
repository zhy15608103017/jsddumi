// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
import { useRequest } from '@jusda-tools/jusda-publichooks';

function useFetchData<T>(props: {
    fetchFunc: (data: T) => Promise<any>;
}): [any[], boolean, (data: T)=>Promise<any>] {
    const {fetchFunc} = props;
    const [enums, setEnum] = useState([]);
    const [loading, run] = useRequest(fetchFunc);

    const selfFetch = async (params: T): Promise<any>=>{
        const resp = await run(params);
        const { success, data} = resp;
        if(success === false)return;
        setEnum(data?.content);
    }

    return [enums, loading, selfFetch];
}

export default useFetchData;


